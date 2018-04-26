const providerList = ['gke', 'aks']

const defaultOptions = {
  gke: {
    version: {
      options: ['v1'],
      default: 'v1'
    },
    k8sVersion: {
      options: [
        '1.9.6-gke.1',
        '1.9.6-gke.0',
        '1.9.3-gke.0',
        '1.8.10-gke.0',
        '1.8.8-gke.0',
        '1.7.15-gke.0'
      ],
      default: '1.9.6-gke.1'
    },
    nodePoolTypes: {
      options: [
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-megamem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-megamem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-megamem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-megamem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-megamem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-megamem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-megamem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-megamem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-megamem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-megamem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-megamem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-megamem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'f1-micro',
        'g1-small',
        'n1-highcpu-16',
        'n1-highcpu-2',
        'n1-highcpu-32',
        'n1-highcpu-4',
        'n1-highcpu-64',
        'n1-highcpu-8',
        'n1-highcpu-96',
        'n1-highmem-16',
        'n1-highmem-2',
        'n1-highmem-32',
        'n1-highmem-4',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96',
        'n1-highmem-64',
        'n1-highmem-8',
        'n1-highmem-96',
        'n1-standard-1',
        'n1-standard-16',
        'n1-standard-2',
        'n1-standard-32',
        'n1-standard-4',
        'n1-standard-64',
        'n1-standard-8',
        'n1-standard-96'
      ],
      default: 'n1-standard-1'
    }
  },
  aks: {
    version: {
      options: ['v1'],
      default: 'v1'
    },
    k8sVersion: {
      options: ['1.8.1', '1.7.7'],
      default: '1.8.1'
    },
    nodePoolTypes: {
      options: [
        'Standard_A0',
        'Standard_A1',
        'Standard_A2',
        'Standard_A3',
        'Standard_A5',
        'Standard_A4',
        'Standard_A6',
        'Standard_A7',
        'Basic_A0',
        'Basic_A1',
        'Basic_A2',
        'Basic_A3',
        'Basic_A4',
        'Standard_D1',
        'Standard_D2',
        'Standard_D3',
        'Standard_D4',
        'Standard_D11',
        'Standard_D12',
        'Standard_D13',
        'Standard_D14',
        'Standard_A1_v2',
        'Standard_A2m_v2',
        'Standard_A2_v2',
        'Standard_A4m_v2',
        'Standard_A4_v2',
        'Standard_A8m_v2',
        'Standard_A8_v2',
        'Standard_DS1',
        'Standard_DS2',
        'Standard_DS3',
        'Standard_DS4',
        'Standard_DS11',
        'Standard_DS12',
        'Standard_DS13',
        'Standard_DS14',
        'Standard_D1_v2',
        'Standard_D2_v2',
        'Standard_D3_v2',
        'Standard_D4_v2',
        'Standard_D5_v2',
        'Standard_D11_v2',
        'Standard_D12_v2',
        'Standard_D13_v2',
        'Standard_D14_v2',
        'Standard_D15_v2',
        'Standard_D2_v2_Promo',
        'Standard_D3_v2_Promo',
        'Standard_D4_v2_Promo',
        'Standard_D5_v2_Promo',
        'Standard_D11_v2_Promo',
        'Standard_D12_v2_Promo',
        'Standard_D13_v2_Promo',
        'Standard_D14_v2_Promo',
        'Standard_F1',
        'Standard_F2',
        'Standard_F4',
        'Standard_F8',
        'Standard_F16',
        'Standard_B1ms',
        'Standard_B1s',
        'Standard_B2ms',
        'Standard_B2s',
        'Standard_B4ms',
        'Standard_B8ms',
        'Standard_DS1_v2',
        'Standard_DS2_v2',
        'Standard_DS3_v2',
        'Standard_DS4_v2',
        'Standard_DS5_v2',
        'Standard_DS11-1_v2',
        'Standard_DS11_v2',
        'Standard_DS12-1_v2',
        'Standard_DS12-2_v2',
        'Standard_DS12_v2',
        'Standard_DS13-2_v2',
        'Standard_DS13-4_v2',
        'Standard_DS13_v2',
        'Standard_DS14-4_v2',
        'Standard_DS14-8_v2',
        'Standard_DS14_v2',
        'Standard_DS15_v2',
        'Standard_DS2_v2_Promo',
        'Standard_DS3_v2_Promo',
        'Standard_DS4_v2_Promo',
        'Standard_DS5_v2_Promo',
        'Standard_DS11_v2_Promo',
        'Standard_DS12_v2_Promo',
        'Standard_DS13_v2_Promo',
        'Standard_DS14_v2_Promo',
        'Standard_F1s',
        'Standard_F2s',
        'Standard_F4s',
        'Standard_F8s',
        'Standard_F16s',
        'Standard_D2_v3',
        'Standard_D4_v3',
        'Standard_D8_v3',
        'Standard_D16_v3',
        'Standard_D32_v3',
        'Standard_D2s_v3',
        'Standard_D4s_v3',
        'Standard_D8s_v3',
        'Standard_D16s_v3',
        'Standard_D32s_v3',
        'Standard_NV6',
        'Standard_NV12',
        'Standard_NV24',
        'Standard_D64_v3',
        'Standard_D64s_v3',
        'Standard_E2_v3',
        'Standard_E4_v3',
        'Standard_E8_v3',
        'Standard_E16_v3',
        'Standard_E32_v3',
        'Standard_E64i_v3',
        'Standard_E64_v3',
        'Standard_E2s_v3',
        'Standard_E4-2s_v3',
        'Standard_E4s_v3',
        'Standard_E8-2s_v3',
        'Standard_E8-4s_v3',
        'Standard_E8s_v3',
        'Standard_E16-4s_v3',
        'Standard_E16-8s_v3',
        'Standard_E16s_v3',
        'Standard_E32-8s_v3',
        'Standard_E32-16s_v3',
        'Standard_E32s_v3',
        'Standard_E64-16s_v3',
        'Standard_E64-32s_v3',
        'Standard_E64is_v3',
        'Standard_E64s_v3',
        'Standard_F2s_v2',
        'Standard_F4s_v2',
        'Standard_F8s_v2',
        'Standard_F16s_v2',
        'Standard_F32s_v2',
        'Standard_F64s_v2',
        'Standard_F72s_v2',
        'Standard_NC6',
        'Standard_NC12',
        'Standard_NC24',
        'Standard_NC24r',
        'Standard_H8',
        'Standard_H16',
        'Standard_H8m',
        'Standard_H16m',
        'Standard_H16r',
        'Standard_H16mr',
        'Standard_G1',
        'Standard_G2',
        'Standard_G3',
        'Standard_G4',
        'Standard_G5',
        'Standard_GS1',
        'Standard_GS2',
        'Standard_GS3',
        'Standard_GS4',
        'Standard_GS4-4',
        'Standard_GS4-8',
        'Standard_GS5',
        'Standard_GS5-8',
        'Standard_GS5-16',
        'Standard_L4s',
        'Standard_L8s',
        'Standard_L16s',
        'Standard_L32s',
        'Standard_M64-16ms',
        'Standard_M64-32ms',
        'Standard_M64ms',
        'Standard_M64s',
        'Standard_M128-32ms',
        'Standard_M128-64ms',
        'Standard_M128ms',
        'Standard_M128s',
        'Standard_NC6s_v3',
        'Standard_NC12s_v3',
        'Standard_NC24rs_v3',
        'Standard_NC24s_v3',
        'Standard_ND6s',
        'Standard_ND12s',
        'Standard_ND24rs',
        'Standard_ND24s',
        'Standard_NC6s_v2',
        'Standard_NC12s_v2',
        'Standard_NC24rs_v2',
        'Standard_NC24s_v2',
        'Standard_A8',
        'Standard_A9',
        'Standard_A10',
        'Standard_A11'
      ],
      default: 'Standard_D1_v2'
    }
  }
}

const getDefaultOptions = (key, provider) => {
  switch (key) {
    case 'version': return defaultOptions[provider]['version'].options
    case 'k8sVersion': return defaultOptions[provider]['k8sVersion'].options
    case 'nodePools+type': return defaultOptions[provider]['nodePoolTypes'].options
    default: return []
  }
}

const getDefaultValue = (key, provider) => {
  switch (key) {
    case 'version':
      return defaultOptions[provider]['version'].default
    case 'k8sVersion':
      return defaultOptions[provider]['k8sVersion'].default
    case 'nodePools+type':
      return defaultOptions[provider]['nodePoolTypes'].default
    default: return []
  }
}

const getProviderSpecSchema = (provider) => {
  const schema =  [
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
      type: 'string',
      defaultValue: 'myCluster'
    },
    {
      key: 'k8sVersion',
      required: true,
      title: 'Kubernetes Version',
      type: 'options',
      options: getDefaultOptions('k8sVersion', provider),
      defaultValue: getDefaultValue('k8sVersion', provider)
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
          type: 'string',
          defaultValue: 'myPool'
        },
        {
          key: 'type',
          title: 'Type',
          required: true,
          description: 'VM type for nodes in this pool',
          type: 'options',
          options: getDefaultOptions('nodePools+type', provider),
          defaultValue: getDefaultValue('nodePools+type', provider)
        },
        {
          key: 'poolSize',
          title: 'Pool Size',
          required: true,
          description: 'Number of nodes in this pool',
          type: 'number',
          defaultValue: 1
        },
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
          required: true,
          description: 'Name of the disk/volume',
          type: 'string',
          defaultValue: 'myVolume'
        },
        {
          key: 'size',
          title: 'Size',
          required: true,
          description: 'Size of the disk/volume in GB',
          type: 'number',
          defaultValue: 10
        }
      ]
    }
  ]

  const labelSchema = {
    key: 'labels',
    minRequired: 0,
    title: 'Labels',
    description: 'Kubernetes labels to be applied to each node in the pool',
    type: 'key-value',
    spec: [
      {
        key: 'name',
        title: 'Key',
        required: true,
        type: 'string'
      },
      {
        key: 'value',
        title: 'Value',
        required: true,
        type: 'string'
      }
    ]
  }

  if (provider === 'gke') {
    schema[4].spec.push(labelSchema)
  }

  return schema
}

const getDataTemplateFromSpecConfig = (specSchema) => {
  const dataTemplate = {}
  specSchema.forEach((s,i) => {
    var value = s.defaultValue || ''
    switch (s.type) {
      case 'options':
      case 'default':
      case 'string':
      case 'number':
        dataTemplate[s.key] = value
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
  providerList,
  getProviderSpecSchema,
  getDataTemplateFromSpecConfig
}
