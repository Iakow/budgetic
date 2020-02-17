import React from 'react';

const Select = (props)=> {
  const options = props.options.map((category, i) => (
    <option key={i} value={category}>
      {category}
    </option> 
  ));


  return (
    <select
      name={props.name}
      value={props.value}
      onChange={props.handler}
      multiple={props.multiple}
    >

      <option value='' disabled>
        {props.name}
      </option>

      {options}
    </select>
  )
}

export default Select;