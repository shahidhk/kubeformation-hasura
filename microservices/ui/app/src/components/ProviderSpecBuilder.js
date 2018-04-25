import React, { Component } from 'react'
import {TextInput, LabelWithAddButton, ListSelect, KeyValuePair, KeyValueContainer} from './PrimitiveComponents'
import '../styles/ProviderSpecBuilder.css'

export default class ProviderSpecBuilder extends Component {

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
          return (
            <TextInput
              key={key}
              title={title}
              description={description}
              value={value}
              onChangeHandler={this.props.changeHandlerCreator(key, func)}
              disabled={isInputDisabled}/>
          )
        case 'number':
          return (
            <TextInput
              key={key}
              title={title}
              description={description}
              value={value}
              type={'number'}
              onChangeHandler={this.props.changeHandlerCreator(key, func)}
              disabled={isInputDisabled}/>
          )
        case 'string':
          return (
            <TextInput
              key={key}
              title={title}
              description={description}
              value={value}
              type={'text'}
              onChangeHandler={this.props.changeHandlerCreator(key, func)}
              disabled={isInputDisabled}/>
          )
        case 'options':
          return (
            <ListSelect
              key={key}
              title={title}
              description={description}
              value={value}
              onChangeHandler={this.props.changeHandlerCreator(key, func)}
              options={singleSpecSchema.options}/>
          )
        case 'key-value':
          const shouldAllowDelete = data[key].length > 1 ? true : false
          var shouldAddNewPair = true;
          const objElements = data[key].map((d, i) => {
            if (d.name === '' && d.value === '') {
              shouldAddNewPair = false
            }
            return (
              <KeyValuePair
                key={i}
                name={d.name} value={d.value} onChangeHandler={this.props.keyValueChangeHandlerCreator(this.props.getArrayHelperFunc(key, i, func))}
                deleteHandler={shouldAllowDelete ? this.props.deleteClickHandler(key, i, func) : null}/>
            )
          })
          if (shouldAddNewPair) {
            this.props.addNewObjToArray(key, singleSpecSchema.spec, func)
          }
          return (
            <KeyValueContainer
              key={key}
              title={title}
              description={description}
              children={objElements}/>
          )
        case 'array':
          const arrayElements = data[key].map((d, i) => {
            const elements = this.getUIFromSpec(singleSpecSchema.spec, d, this.props.getArrayHelperFunc(key, i, func))
            return (
              <div key={i}>
                <div className="card arrayCard">
                  <div className='deleteButton' onClick={this.props.deleteClickHandler(key, i, func)}>
                    <i className="far fa-window-close"></i>
                  </div>
                  <div className='card-body elements'>
                    {elements}
                  </div>
                </div>
              </div>
            )
          })
          return (
            <div key={key}>
              <LabelWithAddButton
                title={title}
                buttonTitle={singleSpecSchema.buttonTitle}
                description={description}
                children={arrayElements}
                addButtonClickHandler={this.props.addButtonClickHandler(key, singleSpecSchema, func)}/>
            </div>
          ) 
        default: return null
      }
    })
  }

  render() {
    if (this.props && this.props.specConfig && this.props.data) {
      return (
        <div className="card">
          <div className="card-body">
            <form>
              {this.getUIFromSpec(this.props.specConfig, this.props.data)}
            </form>
          </div>
        </div>
      )
    }
    return null
  }
}
