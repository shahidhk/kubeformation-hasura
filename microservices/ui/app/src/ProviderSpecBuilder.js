import React, { Component } from 'react'
import {TextInput, LabelWithAddButton, ListSelect, KeyValuePair} from './components/PrimitiveComponents'
import {
  getProviderSpecSchema,
  getDataTemplateFromSpecConfig
} from './helper/specHelper'
import download from 'downloadjs'
import './ProviderSpecBuilder.css'

export default class ProviderSpecBuilder extends Component {

  constructor() {
    super()
    this.specConfig = getProviderSpecSchema('gke')
    this.state = getDataTemplateFromSpecConfig(this.specConfig)
  }

  addButtonClickHandler = (specKey, data, helperFunc) => {
    const getObjFromParent = helperFunc
    const key = specKey
    const dataTemplate = getDataTemplateFromSpecConfig(data[0].spec)
    return (e) => {
      e.preventDefault()
      this.setState(state => {
        if (getObjFromParent) {
          const node = getObjFromParent(state)
          node[key].push(dataTemplate)
          return state
        }
        state[key].push(dataTemplate)
        return state
      })
    }
  }

  deleteClickHandler = (specKey, index, helperFunc) => {
    const getObjFromParent = helperFunc
    const key = specKey
    return (e) => {
      e.preventDefault()
      this.setState(state => {
        if (getObjFromParent) {
          const node = getObjFromParent(state)
          node[key].splice(index, 1)
          return state
        }
        state[key].splice(index, 1)
        return state
      })
    }
  }

  getObjectHelperFunc = (key, previousHelperFunc) => {
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

  changeHandlerCreator = (key, helperFunc) => {
    const getObjFromParent = helperFunc
    return (e) => {
      const newValue = e.target.value
      this.setState(state => {
        if (getObjFromParent) {
          const node = getObjFromParent(state)
          node[key] = newValue
          return state
        }
        state[key] = newValue
        return state
      })
    }
  }

  keyValueChangeHandlerCreator = (func) => {
    const helperFunc = func
    return (pairKey, e) => {
      const newValue = e.target.value
      this.setState(state => {
        if (helperFunc) {
          const node = helperFunc(state)
          node[pairKey] = newValue
          return state
        }
        state[pairKey] = newValue
        return state
      })
    }
  }

  getUIFromSpec = (specSchema, data, func) => {
    return specSchema.map((singleSpecSchema, index) => {
      const key = singleSpecSchema.key
      const title = singleSpecSchema.title || singleSpecSchema.key
      const description = singleSpecSchema.description || null
      var isInputDisabled = false
      var value = data[key]
      switch (singleSpecSchema.type) {
        case 'default':
          isInputDisabled = true
          value = singleSpecSchema.defaultValue
        case 'number':
        case 'string': return (
          <TextInput
            key={key}
            title={title}
            description={description}
            value={value}
            onChangeHandler={this.changeHandlerCreator(key, func)}
            disabled={isInputDisabled}/>
        )
        case 'options': return (
          <ListSelect
            key={key}
            title={title}
            description={description}
            value={value}
            onChangeHandler={this.changeHandlerCreator(key, func)}
            options={singleSpecSchema.options}/>
        )
        case 'key-value':
          const objElements = data[key].map((d, i) => {
            return (
              <KeyValuePair
                key={i}
                description={description}
                name={d.name} value={d.value} onChangeHandler={this.keyValueChangeHandlerCreator(this.getArrayHelperFunc(key, i, func))} />
            )
          })
          return (
            <div key={key}>
              <LabelWithAddButton
                title={title}
                description={description}
                addButtonClickHandler={this.addButtonClickHandler(key, [singleSpecSchema], func)}/>
              <div className='keyValueChildren'>
                <div className='col-sm-1'/>
                <div className='col-sm-11'>
                  {objElements}
                </div>
              </div>
            </div>
          )
        case 'array':
          const arrayElements = data[key].map((d, i) => {
            const elements = this.getUIFromSpec(singleSpecSchema.spec, d, this.getArrayHelperFunc(key, i, func))
            return (
              <div key={i} className="row">
                <div className="col-sm-1" onClick={this.deleteClickHandler(key, i, func)}>{' - '}</div>
                <div className="col-sm-11">{elements}</div>
              </div>
            )
          })
          return (
            <div key={key}>
              <LabelWithAddButton
                title={title}
                description={description}
                addButtonClickHandler={this.addButtonClickHandler(key, [singleSpecSchema], func)}/>
              {arrayElements}
            </div>
          )
        default: return null
      }
    })
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

    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(this.convertStateToAPIRequestFormat(this.state, this.specConfig))
    }
    fetch(url, requestOptions)
    .then(function(response) {
      if (response.status === 200) {
        response.blob().then(blob => {
          console.log(blob)
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
    return (
      <form className='parent'>
        <div>
          {this.getUIFromSpec(this.specConfig, this.state)}
          <button onClick={(e) => {
              e.preventDefault()
              this.downloadTemplate()
            }}>Download</button>
        </div>
      </form>
    )
  }
}
