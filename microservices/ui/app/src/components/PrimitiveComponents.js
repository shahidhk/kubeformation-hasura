import React from 'react'
import '../ProviderSpecBuilder.css'

const Description = ({value}) => {
  if (value) {
    return (<label className='description'>{value}</label>)
  }
  return null
}

const KeyValuePair = ({name, value, onChangeHandler}) => {
  return (
    <div className='keyValuePair'>
      <input
        className="col-sm"
        value={name}
        onChange={(e) => {
          onChangeHandler('name', e)
        }}/>
      <div>:</div>
      <input
        className="col-sm"
        value={value}
        onChange={(e) => {
          onChangeHandler('value', e)
        }}/>
    </div>
  )
}

const ListSelect = ({title, description, value, options, onChangeHandler}) => {
  const id = `${title}ListSelect`
  return (
    <div className="form-group">
      <Label title={title} description={description}/>
       <select
        className="form-control"
        id={id}
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

const TextInput = ({title, description, value, onChangeHandler, disabled}) => {
  return (
    <div className='form-group'>
      <Label title={title} description={description} />
      <input
        className="form-control"
        value={value}
        onChange={onChangeHandler}
        readOnly={disabled}/>
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

const LabelWithAddButton = ({title, description, addButtonClickHandler}) => {
  return (
    <div>
      <div>
        <div className='col-md-6 labelButtonContainer'>
          <label className='title'>{title}</label>
        </div>
        <div className='col-md-6 rightButton'>
          <button onClick={addButtonClickHandler}>+</button>
        </div>
      </div>
      <Description value={description}/>
    </div>
  )
}

export {
  ListSelect,
  TextInput,
  Label,
  LabelWithAddButton,
  KeyValuePair
}
