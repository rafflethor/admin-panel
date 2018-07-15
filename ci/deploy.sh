#!/usr/bin/env bash

set -o pipefail
set -o errexit
set -o nounset"

# DESCRIPTION
# ===========
#
# This script can be used to apply a deployment to k8s using any
# continuous integration environment.
#
# - K8S_CA_CRT: Host certificate
# - K8S_CLUSTER_NAME: Cluster name
# - K8S_HOST: Address name of the K8s cluster
# - K8S_CONTEXT_NAME: Namespace and context name
# - K8S_USERNAME: ServiceAccount name
# - K8S_USER_TOKEN: ServiceAccount token
#
# Once the credentials have been set then we can apply the deployment,
# pods, services...etc yaml files
#
# Finally the scripts deletes the server certificate

echo "DEPLOYED!
