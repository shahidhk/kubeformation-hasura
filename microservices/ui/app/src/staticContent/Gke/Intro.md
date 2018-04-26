# Google Kubernetes Engine (GKE)

For GKE clusters, Kubeformation creates [Google Cloud Deployment
Manager](https://cloud.google.com/deployment-manager/) templates (**GCDM**).

## Pre-requisites

- [`gcloud`](https://cloud.google.com/sdk/gcloud/) CLI
- A project on Google Cloud (check [this
  link](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
  to create one)
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/install-kubectl/) CLI

---

## Step 1 - Generate GCDM template

Build `cluster.yaml` and download the template:
