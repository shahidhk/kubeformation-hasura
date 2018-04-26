# Azure Container Service (AKS)

For AKS clusters, Kubeformation creates [Azure Resource
Manager](https://docs.microsoft.com/en-us/azure/azure-resource-manager/)
templates (**ARM**).

## Pre-requisites

- [Azure CLI 2.0](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
- [`kubeformation`](../cli.md) CLI (optional)
- An Azure Subscription (start for [free
  here](https://azure.microsoft.com/en-us/free/))
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/install-kubectl/) CLI

## Step 1 - Generate ARM template

Start by building the `cluster.yaml` file using the builder below
