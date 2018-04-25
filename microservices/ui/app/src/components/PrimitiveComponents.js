import React from 'react'
import '../styles/ProviderSpecBuilder.css'

const TextInput = ({title, description, type, value, onChangeHandler, disabled}) => {
  return (
    <div className='primitiveComponentParent form-group'>
      <Label title={title} description={description} />
      <input
        className="form-control"
        type={type}
        value={value}
        onChange={onChangeHandler}
        readOnly={disabled}/>
    </div>
  )
}

const Description = ({value}) => {
  if (value) {
    return (<label className='description'>{value}</label>)
  }
  return null
}

const ListSelect = ({title, description, value, options, onChangeHandler}) => {
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

const LabelWithAddButton = ({title, description, buttonTitle, children, addButtonClickHandler}) => {
  return (
    <div className='labelWithAddButton'>
      <label className='title'>{title}</label>
      <Description value={description}/>
      <div className='children'>
        {children}
      </div>
      <button
        type='button'
        className='btn btn-outline-secondary btn-sm'
        onClick={addButtonClickHandler}>
        {buttonTitle}
      </button>
    </div>
  )
}

const KeyValueContainer = ({title, description, children, }) => {
  return (
    <div className='keyValueContainer'>
      <label className='title'>{title}</label>
      <Description value={description}/>
      <div className='keyValuePair'>
        <div className="pairTitle">Key</div>
        <div className="pairTitle">Value</div>
      </div>
      {children}
    </div>
  )
}

const KeyValuePair = ({name, value, onChangeHandler, deleteHandler}) => {
  return (
    <div className='keyValuePair form-group input-group-sm mb-3'>
      <input
        type='text'
        className="form-control "
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
