import React, { Component } from 'react'
import {TextInput, LabelWithAddButton, ListSelect, KeyValuePair, KeyValueContainer} from './PrimitiveComponents'
import '../styles/ProviderSpecBuilder.css'

export default class ProviderSpecBuilder extends Component {

  getUIFromSpec = (specSchema, data, func, previousKey) => {
    return specSchema.map((singleSpecSchema, index) => {
      const key = singleSpecSchema.key
      const errorKey = previousKey ? `${previousKey}+${key}` : `${key}`
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
              error={this.props.error[errorKey]}
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
              error={this.props.error[errorKey]}
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
              error={this.props.error[errorKey]}
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
              error={this.props.error[errorKey]}
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
            const errorObj = {
              name: this.props.error[`${errorKey}+${i}+name`],
              value: this.props.error[`${errorKey}+${i}+value`]
            }
            return (
              <KeyValuePair
                key={i}
                name={d.name} value={d.value} error={errorObj}
                onChangeHandler={
                  this.props.keyValueChangeHandlerCreator(
                    this.props.keyValuePairHelperFunc(key, func),
                    i,
                    singleSpecSchema.spec
                  )
                }
                deleteHandler={
                  shouldAllowDelete ?
                  this.props.deleteClickHandler(key, i, func)
                  : null
                }/>
            )
          })
          return (
            <KeyValueContainer
              key={key}
              title={title}
              error={this.props.error[errorKey]}
              description={description}
              children={objElements}/>
          )
        case 'array':
          const arrayElements = data[key].map((d, i) => {
            const elements = this.getUIFromSpec(singleSpecSchema.spec, d, this.props.getArrayHelperFunc(key, i, func), `${errorKey}+${i}`)
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
                error={this.props.error[errorKey]}
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
              <hr className='cardFooterBreakLine'/>
              <button className='btn btn-primary btn-md downloadButton' onClick={this.props.downloadClickHandler}>
                {this.props.downloadButtonText}
              </button>
            </form>
          </div>
        </div>
      )
    }
    return null
  }
}
