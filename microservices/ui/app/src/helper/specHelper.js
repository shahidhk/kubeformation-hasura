const getDefaultOptions = (key, provider) => {
  switch (key) {
    case 'version': return ['v1']
    case 'k8sVersion': return ['1.1', '1.2', '1.3']
    case 'nodePools+type': return ['type1', 'type2', 'type3']
    case 'nodePools+osImage': return ['image1', 'image2', 'image3']
    default: return []
  }
}

const getProviderSpecSchema = (provider) => {
  return [
    {
      key: 'version',
      title: 'Version',
      type: 'default',
      defaultValue: 'v1'
    },
    {
      key: 'provider',
      title: 'Provider',
      type: 'default',
      defaultValue: provider
    },
    {
      key: 'name',
      title: 'Name',
      description: 'The name of your cluster',
      type: 'string'
    },
    {
      key: 'k8sVersion',
      title: 'K8sVersion',
      description: 'Your k8s Version',
      type: 'options',
      options: getDefaultOptions('k8sVersion', provider)
    },
    {
      key: 'nodePools',
      title: 'Node Pools',
      description: 'The configuration for your node pools',
      type: 'array',
      spec: [
        {
          key: 'name',
          type: 'string'
        },
        {
          key: 'type',
          type: 'options',
          options: getDefaultOptions('nodePools+type', provider)
        },
        {
          key: 'poolSize',
          type: 'number'
        },
        {
          key: 'osImage',
          type: 'options',
          options: getDefaultOptions('nodePools+osImage', provider)
        },
        {
          key: 'labels',
          type: 'key-value',
          spec: [
            {
              key: 'name',
              type: 'string'
            },
            {
              key: 'value',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      key: 'volumes',
      type: 'array',
      spec: [
        {
          key: 'name',
          type: 'string'
        },
        {
          key: 'size',
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
      case 'key-value':
        dataTemplate[s.key] = [getDataTemplateFromSpecConfig(specSchema[i].spec)]
        break
      default:
    }
  })
  return dataTemplate
}

export {
  getProviderSpecSchema,
  getDataTemplateFromSpecConfig
}
