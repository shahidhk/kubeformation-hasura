This will give us the following files:
- `gke-cluster.yaml`
- `gke-cluster.jinja`
- `k8s-volumes.yaml` (only if `volumes` are present in the spec)

## Step 2 - Add parameters

The following parameters which are provider specific need to be added:
- `ZONE` - GCP zone where the cluster has to be created
- `PROJECT` - GCP project

Open `gke-cluster.yaml` file and add the required GCP zone and project name by
replacing `ZONE` and `PROJECT`:

```yaml
imports:
- path: gke-cluster.jinja

resources:
- name:  my-cluster
  type: gke-cluster.jinja
  properties:
    name: my-cluster
    project: PROJECT
    zone: ZONE
```

## Step 3 - Create the cluster

Create the cluster (and any disks) as defined by `gke-cluster.yaml`:

```bash
$ gcloud deployment-manager deployments create my-cluster --config gke-cluster.yaml
```

That's it! The GKE cluster will be created.

Get `kubectl` context to connect to the cluster:

```bash
$ gcloud container clusters get-credentials my-cluster --zone <zone> --project <project>
```

## Step 4 - Create K8s Persistent Volumes

If the cluster spec also contains volumes, along with underlying disks, the
Kubernetes PV & PVC objects also have to be created, so that the disks can be
used by other k8s deployments etc.

```bash
$ kubectl create -f k8s-volumes.yaml
```

## Tearing down

Delete the deployment to tear down the cluster (and disks):

```bash
$ gcloud deployment-manager deployments delete my-cluster
```
