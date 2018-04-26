Unzip the downloaded files. It will have the following files:

- `cluster.yaml` (The cluster spec)
- `aks-deploy.json` (ARM template file, defines all the resources)
- `aks-params.json` (ARM parameters file, defines params used by template)
- `aks-disks.json` (ARM template for creating disks, created only if `volumes` are present)
- `k8s-volumes.yaml` (k8s pv/pvc objects, created only if `volumes` are present)

---

## Step 2 - Add parameters

The following parameters are required:

- `SSH-PUBLIC-KEY` - SSH public key to be added to each node in the cluster. (can be the user's
  public key from `~/.ssh/id_rsa.pub`)
- `SERVICE-PRINCIPAL-CLIENT-ID`
- `SERVICE-PRINCIPAL-CLIENT-SECRET`

To create service principal, execute the following command:

```bash
$ az ad sp create-for-rbac --name my-cluster-sp
```

(note: it could take some time for service principal to get created.)

The output will be a JSON, of which `appId` is the `SERVICE-PRINCIPAL-CLIENT-ID`
and `password` is `SERVICE-PRINCIPAL-CLIENT-SECRET`.

These parameters should be added to `aks-params.json` file, by replacing the placeholders.

---

## Step 3 - Create the cluster

- Create an Azure Resource Group
  ```bash
  $ az group create -l westeurope -n my-resource-group
  ```
- Create the cluster
  ```bash
  $ az group deployment create -n my-cluster -g my-resource-group --template-file aks-deploy.json --parameters @aks-params.json
  ```
- Create disks (if any):
  ```bash
  $ az group deployment create -n my-cluster-disks -g MC_my-resource-group_my-cluster_westeurope --template-file aks-disks.json
  ```

  The resource group mentioned here (stating with `MC_`) is automatically
  created by Azure to host all the infrastructure resources required by the
  Kubernetes cluster, including underlying VMs. Hence, the disks should be
  created in this resource group to be able to mount inside the cluster.

  Naming convention for this resource group is
  `MC_<original-resource-group-name>_<aks-cluster-name>_<location>`.

Get `kubectl` context to connect to the cluster:

```bash
$ az aks get-credentials -g my-resource-group -n my-cluster
```

---

## Step 4 - Create K8s Persistent Volumes

If the cluster spec also contains volumes, along with underlying disks, the
Kubernetes PV & PVC objects also have to be created, so that the disks can be
used by other k8s deployments etc.

Edit `k8s-volumes.yaml` and replace the placeholders for:
- `SUBSCRIPTION-ID` - Get the `SubscriptionId` from the output of:
   ```bash
   $ az account list --output table
   ```
- `RESOURCE-GROUP-NAME` - Get the resource group name azure created (in this
  case `MC_my-resource-group_my-cluster_westeurope`)
  ```bash
  $ az group list --output table
  ```

Create the k8s resources:

```bash
$ kubectl create -f k8s-volumes.yaml
```

---

## Tearing down

Delete the resource group to tear down the cluster and disks:

```bash
$ az group delete -n my-resource-group
```

We also need to delete the resource group Azure created automatically to completely
tear down all the resources:

```bash
$ az group delete -n MC_my-resource-group_my-cluster_westeurope
```
