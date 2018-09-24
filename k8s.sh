#!/usr/bin/env bash

case $1 in
    deploy)
        kubectl apply -f k8s-deploy.yml
        ;;
    delete)
        kubectl delete ingress/adminpanel -n rafflethor
        kubectl delete service/adminpanel -n rafflethor
        kubectl delete deploy/adminpanel -n rafflethor
        ;;
    *)
        echo "deploy/delete"
        ;;
esac
