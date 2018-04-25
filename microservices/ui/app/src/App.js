import React, { Component } from 'react'
import ProviderSpecBuilder from './components/ProviderSpecBuilder'
import Header from './components/Header'
import download from 'downloadjs'
import { providerList } from './helper/specHelper'
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
      data: data
    }
  }

  handleProviderSelectionChange = (provider) => {
    return (e) => {
      e.preventDefault()
      this.setState({
        ...this.state,
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

  keyValuePairHelperFunc = (key, index, previousHelperFunc) => {
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

  keyValueChangeHandlerCreator = (func) => {
    const helperFunc = func
    return (pairKey, e) => {
      const newValue = e.target.value
      this.setState(state => {
        if (helperFunc) {
          const node = helperFunc(state.data[this.state.selectedProvider])
          node[pairKey] = newValue
          return state
        }
        state.data[this.state.selectedProvider][pairKey] = newValue
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
            keyValueObj[pair.name] = pair.value
          })
          requestBody[s.key] = keyValueObj
          break
        default:
      }
    })
    return requestBody
  }

  downloadTemplate = () => {
    const fileName = `cluster-${this.state.name}`
    var url = 'https://kfm.crackerjack65.hasura-app.io/render?download=true'
    const data = this.state.data[this.state.selectedProvider]
    const specConfig = this.state.specConfig[this.state.selectedProvider]

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

  render() {
    const providerSpecData = this.state.data[this.state.selectedProvider]
    const specConfig = this.state.specConfig[this.state.selectedProvider]
    console.log(this.state)
    return (
      <div>
        <Header />
        <div className='step1Container'>
          <div className='centeredContainer'>
            <h2>Step 1: Build the spec</h2>
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
          <div className='builderContainer'>
            <ProviderSpecBuilder
              data={providerSpecData}
              specConfig={specConfig}
              addButtonClickHandler={this.addButtonClickHandler}
              deleteClickHandler={this.deleteClickHandler}
              getObjectHelperFunc={this.getObjectHelperFunc}
              getArrayHelperFunc={this.getArrayHelperFunc}
              changeHandlerCreator={this.changeHandlerCreator}
              addNewObjToArray={this.addNewObjToArray}
              keyValueChangeHandlerCreator={this.keyValueChangeHandlerCreator}/>
          </div>
        </div>
        <div className='step2Container'>
          <div className='centeredContainer'>
            <h2>Step 2 - Download and use deployment manager template</h2>
            <button className='btn btn-primary btn-lg ' onClick={(e) => {
                e.preventDefault()
                this.downloadTemplate()
              }}>Download</button>
            <div className='darkgraybg_color_getstart'>
              <code className='code-container removebg_color'>
                <div className='quickstart_cmds'>
                  hasura quickstart hello-world
                </div>
                <div className='quickstart_cmds'>
                  cd hello-world
                </div>
                <div className='quickstart_cmds'>
                  git add . && git commit -m "First Commit"
                </div>
                <div className='quickstart_cmds'>
                  git push hasura master
                </div>
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
