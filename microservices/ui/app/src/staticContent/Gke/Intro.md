# Google Kubernetes Engine (GKE)

For GKE clusters, Kubeformation creates [Google Cloud Deployment
Manager](https://cloud.google.com/deployment-manager/) templates (**GCDM**).
These templates can be used with
[`gcloud`](https://cloud.google.com/sdk/gcloud/) command line tool to create the
Kubernetes cluster. Further edits to the templates can also be applied using
`gcloud` cli. If volumes are present, a corresponding Kubernetes Persistent
Volume and Claim objects are also created, along with underlying [Persistent
Disk](https://cloud.google.com/persistent-disk/).

The provider string is `gke`.

## Pre-requisites

- [`gcloud`](https://cloud.google.com/sdk/gcloud/) CLI
- [`kubeformation`](../cli.md) CLI (optional)
- A project on Google Cloud (check [this
  link](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
  to create one)
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/install-kubectl/) CLI

## Step 1 - Generate GCDM template

Start by building the `cluster.yaml` file using the builder below
