#!/usr/bin/env bash

set -o pipefail
set -o errexit
set -o nounset

# DESCRIPTION
# ===========
#
# This script can be used to apply a deployment to k8s using any
# continuous integration environment.
#
# - K8S_CLUSTER_NAME: Cluster name
# - K8S_HOST: Address name of the K8s cluster
# - K8S_CA_CRT: Host certificate
# - K8S_CONTEXT_NAME: Namespace and context name
# - K8S_USERNAME: ServiceAccount name
# - K8S_USER_TOKEN: ServiceAccount token
#
# Once the credentials have been set then we can apply the deployment,
# pods, services...etc yaml files
#
# Finally the scripts deletes the server certificate

echo $K8S_CA_CRT | base64 --decode -i > ${HOME}/ca.crt
K8S_USER_TOKEN=$(echo $K8S_USER_TOKEN | base64 -d)

# Docker variables to deploy Docker to a Docker repo
DOCKER_VERSION="1.0.3"
DOCKER_IMAGE="rafflethor-docker-rafflethor.bintray.io/admin-panel:${DOCKER_VERSION}"
BINTRAY_REPO="rafflethor-docker-rafflethor.bintray.io"

# Removes the certificate from ci machine
function cleanup {
    printf "Cleaning up...\n"
    rm -vf "${HOME}/ca.crt"
    printf "Cleaning done."
}

# Sets the required credentials to deploy this
# app to k8s
function set_credentials {
    # SET-CREDENTIALS
    kubectl config set-cluster ${K8S_CLUSTER_NAME} --embed-certs=true --server=${K8S_HOST} --certificate-authority=${HOME}/ca.crt
    kubectl config set-credentials ${K8S_USERNAME} --token=${K8S_USER_TOKEN}
    kubectl config set-context ${K8S_CONTEXT_NAME} --cluster=${K8S_CLUSTER_NAME} --user=${K8S_USERNAME}
    kubectl config use-context ${K8S_CONTEXT_NAME}
}

# Depending on script's first parameter
case $1 in
    build)
        # This builds the Docker image and pushes it to the Bintray repository.
        # This new image will be used to update the k8s deployment later
        docker login -u $BNT_USER -p $BNT_KEY $BINTRAY_REPO
        docker build -t $DOCKER_IMAGE .
        docker tag $DOCKER_IMAGE $DOCKER_IMAGE
        docker push $DOCKER_IMAGE
        ;;
    deploy)
        # If deployment hasn't been deployed yet this is the command to use to
        # deploy it for the first time
        set_credentials

        kubectl apply -f ci/deployment -n $K8S_CONTEXT_NAME

        trap cleanup EXIT
        ;;
    update)
        # Updates the current deployment with the next avaiable Docker image
        set_credentials

        kubectl set image deployment/adminpanel -n $K8S_CONTEXT_NAME adminpanel=$DOCKER_IMAGE

        trap cleanup EXIT
        ;;
    delete)
        # Deletes all k8s artifacts for this app
        set_credentials

        kubectl delete ingress/adminpanel -n $K8S_CONTEXT_NAME
        kubectl delete service/adminpanel -n $K8S_CONTEXT_NAME
        kubectl delete deploy/adminpanel -n $K8S_CONTEXT_NAME

        trap cleanup EXIT
        ;;
    *)
        echo "build/deploy/udpate/delete"
        ;;
esac
