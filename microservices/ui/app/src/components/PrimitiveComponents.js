import React from 'react'
import '../styles/ProviderSpecBuilder.css'

const TextInput = ({title, description, type, error, value, onChangeHandler, disabled}) => {
  return (
    <div className='primitiveComponentParent form-group'>
      <Label title={title} description={description} />
      <input
        className="form-control"
        type={type}
        value={value}
        onChange={onChangeHandler}
        readOnly={disabled}/>
      {
        error ? <Error message={error}/> : null
      }
    </div>
  )
}

const Description = ({value}) => {
  if (value) {
    return (<label className='description'>{value}</label>)
  }
  return null
}

const ListSelect = ({title, description, value, error, options, onChangeHandler}) => {
  const id = `${title}ListSelect`
  return (
    <div className="form-group">
      <Label title={title} description={description}/>
       <select
        className="form-control"
        id={id}
        value={value}
        onChange={onChangeHandler}>
        {
          options.map((option, i) => (
            <option key={i} value={option}>{option}</option>
          ))
        }
       </select>
       {
         error ? <Error message={error}/> : null
       }
    </div>
  )
}

const Label = ({title, description}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <label className='title'>{title}</label>
      <Description value={description}/>
    </div>
  )
}

const Error = ({message}) => {
  return (
    <label className='error'>{message}</label>
  )
}

const LabelWithAddButton = ({title, description, error, buttonTitle, children, addButtonClickHandler}) => {
  return (
    <div className='labelWithAddButton'>
      <label className='title'>{title}</label>
      <Description value={description}/>
      <div className='children'>
        {children}
      </div>
      {
        error ? <Error message={error}/> : null
      }
      <button
        type='button'
        className='btn btn-outline-secondary btn-sm'
        onClick={addButtonClickHandler}>
        {buttonTitle}
      </button>
    </div>
  )
}

const KeyValueContainer = ({title, description, error, children, }) => {
  return (
    <div className='keyValueContainer'>
      <label className='title'>{title}</label>
      <Description value={description}/>
      {
        error ? <Error message={error}/> : null
      }
      <div className='keyValuePair'>
        <div className="pairTitle">Key</div>
        <div className="pairTitle">Value</div>
      </div>
      {children}
    </div>
  )
}

const KeyValuePair = ({name, value, error, onChangeHandler, deleteHandler}) => {
  return (
    <div>
      <div className='keyValuePair form-group input-group-sm mb-3'>
        <input
          type='text'
          className="form-control"
          value={name}
          onChange={(e) => {
            onChangeHandler('name', e)
          }}/>
        <input
          className="form-control"
          value={value}
          onChange={(e) => {
            onChangeHandler('value', e)
          }}/>
        {
          deleteHandler ?
          <div className='deleteButton_20' onClick={deleteHandler}>
            <i className="fas fa-times"></i>
          </div>
          : <div className='deleteButton_20'/>
        }
      </div>
      {
        error.name ? <Error message={error.name}/> : null
      }
      {
        error.value ? <Error message={error.value}/> : null
      }
    </div>

  )
}

export {
  ListSelect,
  TextInput,
  Label,
  LabelWithAddButton,
  KeyValuePair,
  KeyValueContainer
}
