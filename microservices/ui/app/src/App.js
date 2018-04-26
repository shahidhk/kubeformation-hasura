import React, { Component } from 'react'
import ProviderSpecBuilder from './components/ProviderSpecBuilder'
import Header from './components/Header'
import download from 'downloadjs'
import CustomMarkdown from './components/CustomMarkdown/CustomMarkdown'
import { providerList } from './helper/specHelper'
import ReactDOM from 'react-dom';
import './styles/App.css'

import {
  getProviderSpecSchema,
  getDataTemplateFromSpecConfig
} from './helper/specHelper'

class App extends Component {

  constructor() {
    super()
    const specConfig = {}
    const data = {}
    providerList.forEach(provider => {
      specConfig[provider] = getProviderSpecSchema(provider)
      data[provider] = getDataTemplateFromSpecConfig(specConfig[provider])
    })
    this.state = {
      selectedProvider: providerList[0],
      specConfig: specConfig,
      data: data,
      error: {},
      content: {
        aks: {
          intro: '',
          steps: ''
        },
        gke: {
          intro: '',
          steps: ''
        }
      }
    }
  }

  loadContentFromFile = (content, stateUpdateFunc) => {
    fetch(content)
    .then(response => {
      return response.text()
    })
    .then(text => {
      stateUpdateFunc(text)
    })
  }

  componentWillMount() {
    const aksIntro = require('./staticContent/Aks/Intro.md');
    const aksContent = require('./staticContent/Aks/Steps.md');
    this.loadContentFromFile(aksIntro, (text) => {
      this.setState(state => {
        state.content['aks'].intro = text
        return state
      })
    })
    this.loadContentFromFile(aksContent, (text) => {
      this.setState(state => {
        state.content['aks'].steps = text
        return state
      })
    })
    const gkeIntro = require('./staticContent/Gke/Intro.md');
    const gkeContent = require('./staticContent/Gke/Steps.md');
    this.loadContentFromFile(gkeIntro, (text) => {
      this.setState(state => {
        state.content['gke'].intro = text
        return state
      })
    })
    this.loadContentFromFile(gkeContent, (text) => {
      this.setState(state => {
        state.content['gke'].steps = text
        return state
      })
    })
  }

  handleProviderSelectionChange = (provider) => {
    return (e) => {
      e.preventDefault()
      this.setState({
        ...this.state,
        error: {},
        selectedProvider: provider
      })
    }
  }

  addNewObjToArray = (key, spec, getObjFromParent) => {
    const dataTemplate = getDataTemplateFromSpecConfig(spec)
    this.setState(state => {
      if (getObjFromParent) {
        const node = getObjFromParent(state.data[this.state.selectedProvider])
        node[key].push(dataTemplate)
        return state
      }
      state.data[this.state.selectedProvider][key].push(dataTemplate)
      return state
    })
  }

  addButtonClickHandler = (specKey, data, helperFunc) => {
    const getObjFromParent = helperFunc
    const key = specKey
    return (e) => {
      e.preventDefault()
      this.addNewObjToArray(key, data.spec, getObjFromParent)
    }
  }

  deleteClickHandler = (specKey, index, helperFunc) => {
    const getObjFromParent = helperFunc
    const key = specKey
    return (e) => {
      e.preventDefault()
      this.setState(state => {
        if (getObjFromParent) {
          const node = getObjFromParent(state.data[this.state.selectedProvider])
          node[key].splice(index, 1)
          return state
        }
        state.data[this.state.selectedProvider][key].splice(index, 1)
        return state
      })
    }
  }

  getObjectHelperFunc = (key, previousHelperFunc) => {
    const helperFunc = previousHelperFunc
    const specKey = key
    return (state) => {
      if (helperFunc) {
        const obj = helperFunc(state.data[this.state.selectedProvider])
        return obj[specKey]
      }
      return state.data[this.state.selectedProvider][specKey]
    }
  }

  changeHandlerCreator = (key, helperFunc) => {
    const getObjFromParent = helperFunc
    return (e) => {
      const newValue = e.target.value
      this.setState(state => {
        if (getObjFromParent) {
          const node = getObjFromParent(state.data[this.state.selectedProvider])
          node[key] = newValue
          return state
        }
        state.data[this.state.selectedProvider][key] = newValue
        return state
      })
    }
  }

  getArrayHelperFunc = (key, index, previousHelperFunc) => {
    const helperFunc = previousHelperFunc
    const i = index
    const specKey = key
    return (state) => {
      if (helperFunc) {
        const obj = helperFunc(state)
        return obj[specKey][i]
      }
      return state[specKey][i]
    }
  }

  keyValuePairHelperFunc = (key, previousHelperFunc) => {
    const helperFunc = previousHelperFunc
    const specKey = key
    return (state) => {
      if (helperFunc) {
        const obj = helperFunc(state)
        return obj[specKey]
      }
      return state[specKey]
    }
  }

  keyValueChangeHandlerCreator = (func, i, s) => {
    const helperFunc = func
    const index = i
    const dataTemplate = getDataTemplateFromSpecConfig(s)
    return (pairKey, e) => {
      const newValue = e.target.value
      this.setState(state => {
        var shouldAddNewPair = true
        if (helperFunc) {
          const dataArray = helperFunc(state.data[this.state.selectedProvider])
          dataArray[index][pairKey] = newValue
          dataArray.forEach((d) => {
            if (d.name === '' && d.value === '') {
              shouldAddNewPair = false
            }
          })
          if (shouldAddNewPair) {
            dataArray.push(dataTemplate)
          }
          return state
        }
        state.data[this.state.selectedProvider][index][pairKey] = newValue
        state.data[this.state.selectedProvider].forEach(d => {
          if (d.name === '' && d.value === '') {
            shouldAddNewPair = false
          }
        })
        if (shouldAddNewPair) {
          state.data[this.state.selectedProvider].push(dataTemplate)
        }
        return state
      })
    }
  }

  convertStateToAPIRequestFormat = (state, spec) => {
    const requestBody = {}
    spec.forEach((s, i) => {
      switch (s.type) {
        case 'default':
        case 'string':
        case 'options':
          requestBody[s.key] = state[s.key]
          break
        case 'number':
          requestBody[s.key] = parseInt(state[s.key], 10)
          break
        case 'array':
          requestBody[s.key] = state[s.key].map((value, i) => {
            return this.convertStateToAPIRequestFormat(value, s.spec)
          })
          break
        case 'key-value':
          const keyValueObj = {}
          state[s.key].forEach((pair, i) => {
            if (pair.name !== '' || pair.value !== '') {
              keyValueObj[pair.name] = pair.value
            }
          })
          requestBody[s.key] = keyValueObj
          break
        default:
      }
    })
    return requestBody
  }

  isFormValid = (data, spec, previousKey, errorState) => {
    spec.forEach((s, i) => {
      const newKey = previousKey ? `${previousKey}+${s.key}` : `${s.key}`
      switch (s.type) {
        case 'default':
        case 'string':
        case 'options':
        case 'number':
          if (s.required) {
            if (data[s.key] === '') {
              errorState[newKey] = `${s.title} is a required parameter`
            }
          }
          break
        case 'key-value':
          if (data[s.key].length < s.minRequired) {
            errorState[newKey] = `Atleast ${s.minRequired} value for ${s.title.toLowerCase()} is required`
          }
          if (data[s.key].length > 0) {
            data[s.key].forEach((d, i) => {
              if (d.name !== '' || d.value !== '') {
                this.isFormValid(d, s.spec, `${newKey}+${i}`, errorState)
              }
            })
          }
          break
        case 'array':
          if (data[s.key].length < s.minRequired) {
            errorState[newKey] = `Atleast ${s.minRequired} value for ${s.title.toLowerCase()} is required`
          } else if (data[s.key].length > 0) {
            data[s.key].forEach((d, i) => {
              this.isFormValid(d, s.spec, `${newKey}+${i}`, errorState)
            })
          }
          break
        default:
      }
    })
    return errorState
  }

  scrollToForm = () => {
    const specBuilderNode = ReactDOM.findDOMNode(this.refs.providerSpecBuilder)
    window.scrollTo(0, specBuilderNode.offsetTop)
  }

  downloadTemplate = () => {
    const data = this.state.data[this.state.selectedProvider]
    const specConfig = this.state.specConfig[this.state.selectedProvider]

    const errorState = this.isFormValid(data, specConfig, null, {})
    this.setState(state => {
      state.error = errorState
      return state
    })
    if (Object.keys(errorState).length !== 0 && errorState.constructor === Object) {
      this.scrollToForm()
      return
    }

    const fileName = `cluster-${this.state.data[this.state.selectedProvider].name}`
    var url = 'https://kfm.crackerjack65.hasura-app.io/render?download=true'

    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(this.convertStateToAPIRequestFormat(data, specConfig))
    }
    fetch(url, requestOptions)
    .then(function(response) {
      if (response.status === 200) {
        response.blob().then(blob => {
          download(blob, fileName, 'application/zip');
        });
      } else {
        console.log('Request returned non 200')
      }
    })
    .catch(function(error) {
      console.log('Request Failed:' + error);
    });
  }

  downloadClickHandler = (e) => {
    e.preventDefault()
    this.downloadTemplate()
  }

  render() {
    const providerSpecData = this.state.data[this.state.selectedProvider]
    const specConfig = this.state.specConfig[this.state.selectedProvider]
    const error = this.state.error
    let downloadButtonText = "Download "
    switch (this.state.selectedProvider) {
      case 'gke':
        downloadButtonText += "Deployment Manager Template"
        break;
      case 'aks':
        downloadButtonText += "Resource Manager Template"
    }
    return (
      <div>
        <Header />
        <div className='step1Container'>
          <div className='centeredContainer'>
            <h2>Choose a provider</h2>
            {
              providerList.map((provider, index) => {
                var className = 'btn btn-outline-secondary spacedButtons'
                if (provider === this.state.selectedProvider) {
                  className += ' active'
                }
                return (
                  <button
                    key={index}
                    type="button"
                    className={className}
                    onClick={this.handleProviderSelectionChange(provider)}>
                    {provider.toUpperCase()}
                  </button>
                )
              })
            }
            <a target='_blank' rel="noopener noreferrer" href='https://github.com/hasura/kubeformation/issues/11'>
              <button
                type="button"
                className='btn btn-outline-secondary spacedButtons'>
                OTHER
              </button>
            </a>
          </div>
          <hr />
          <div className='markdown'>
            <CustomMarkdown className='markdown' markdown={this.state.content[this.state.selectedProvider].intro}/>
          </div>
          <div className='builderContainer'>
            <ProviderSpecBuilder
              ref='providerSpecBuilder'
              data={providerSpecData} specConfig={specConfig} error={error}
              addButtonClickHandler={this.addButtonClickHandler}
              deleteClickHandler={this.deleteClickHandler}
              getObjectHelperFunc={this.getObjectHelperFunc}
              getArrayHelperFunc={this.getArrayHelperFunc}
              changeHandlerCreator={this.changeHandlerCreator}
              keyValuePairHelperFunc={this.keyValuePairHelperFunc}
              keyValueChangeHandlerCreator={this.keyValueChangeHandlerCreator}
              downloadButtonText={downloadButtonText}
              downloadClickHandler={this.downloadClickHandler}/>
          </div>
          <div className='markdown'>
            <CustomMarkdown className='markdown' markdown={this.state.content[this.state.selectedProvider].steps}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
