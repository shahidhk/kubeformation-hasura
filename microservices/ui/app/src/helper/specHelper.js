const providerList = ['gke', 'aks']

const getDefaultOptions = (key, provider) => {
  const defaultOptions = {
    gke: {
      version: ['v1'],
      k8sVersion: ['1.9.6-gke.1', '1.9.6-gke.0', '1.9.3-gke.0', '1.8.10-gke.0', '1.8.8-gke.0 (default)', '1.7.15-gke.0'],
      nodePoolTypes: []
    },
    aks: {
      version: ['v1'],
      k8sVersion: ['1.9.6-gke.1', '1.9.6-gke.0', '1.9.3-gke.0', '1.8.10-gke.0', '1.8.8-gke.0 (default)', '1.7.15-gke.0'],
      nodePoolTypes: []
    }
  }
  switch (key) {
    case 'version': return defaultOptions[provider]['version']
    case 'k8sVersion': return defaultOptions[provider]['k8sVersion']
    case 'nodePools+type': return defaultOptions[provider]['nodePoolTypes']
    default: return []
  }
}

const getProviderSpecSchema = (provider) => {
  return [
    {
      key: 'version',
      title: 'Version',
      description: 'Spec version (currently v1)',
      type: 'default',
      defaultValue: 'v1'
    },
    {
      key: 'provider',
      title: 'Provider',
      description: 'Managed Kubernetes provider',
      type: 'default',
      defaultValue: provider
    },
    {
      key: 'name',
      title: 'Name',
      required: true,
      description: 'Name of the cluster',
      type: 'string'
    },
    {
      key: 'k8sVersion',
      required: true,
      title: 'Kubernetes Version',
      type: 'options',
      options: getDefaultOptions('k8sVersion', provider)
    },
    {
      key: 'nodePools',
      title: 'Node Pools',
      minRequired: 1,
      buttonTitle: '+ Add a node pool',
      description: 'Configuration for node pools',
      type: 'array',
      spec: [
        {
          key: 'name',
          title: 'Name',
          required: true,
          description: 'Name of the node pool',
          type: 'string'
        },
        {
          key: 'type',
          title: 'Type',
          required: true,
          description: 'VM type for nodes in this pool',
          type: 'options',
          options: getDefaultOptions('nodePools+type', provider)
        },
        {
          key: 'poolSize',
          title: 'Pool Size',
          required: true,
          description: 'Number of nodes in this pool',
          type: 'number'
        },
        {
          key: 'labels',
          minRequired: 0,
          title: 'Labels',
          description: 'Kubernetes labels to be applied to each node in the pool',
          type: 'key-value',
          spec: [
            {
              key: 'name',
              required: true,
              type: 'string'
            },
            {
              key: 'value',
              required: true,
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      key: 'volumes',
      title: 'Volumes',
      minRequired: 0,
      buttonTitle: '+ Add a volume',
      description: 'Volumes required for this cluster',
      type: 'array',
      spec: [
        {
          key: 'name',
          title: 'Name',
          description: 'Name of the disk/volume',
          type: 'string'
        },
        {
          key: 'size',
          title: 'Size',
          description: 'Size of the disk/volume in GB',
          type: 'number'
        }
      ]
    }
  ]
}

const getDataTemplateFromSpecConfig = (specSchema) => {
  const dataTemplate = {}
  specSchema.forEach((s,i) => {
    var value = ''
    switch (s.type) {
      case 'options':
        dataTemplate[s.key] = s.options[0]
        break
      case 'default':
        dataTemplate[s.key] = s.defaultValue
        break
      case 'string':
        dataTemplate[s.key] = value
        break
      case 'number':
        dataTemplate[s.key] = 0
        break
      case 'array':
        dataTemplate[s.key] = []
        break
      case 'key-value':
        dataTemplate[s.key] = [getDataTemplateFromSpecConfig(specSchema[i].spec)]
        break
      default:
    }
  })
  return dataTemplate
}

export {
  providerList,
  getProviderSpecSchema,
  getDataTemplateFromSpecConfig
}
