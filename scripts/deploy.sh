#!/bin/bash

# Storage
kubectl apply -f ../k8s/storage/postgres-storage.yaml

# Apply Config
kubectl apply -f ../k8s/config/postgres-config.yaml

# Apply Deployments
kubectl apply -f ../k8s/deployments/postgres-deployment.yaml
kubectl apply -f ../k8s/deployments/services-deployment.yaml

# Apply Services
kubectl apply -f ../k8s/services/services.yaml

# Apply Ingress
kubectl apply -f ../k8s/ingress/ingress.yaml
