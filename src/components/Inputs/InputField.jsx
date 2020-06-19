import React from 'react';
import css from './input.module.css';

const InputField = (props) => {
  const className = (props.type === 'number') ?
    `${css.inputField}  ${css.activeInput}`
    : css.inputField;

  const cssError = (props.error) ?
    { backgroundColor: 'red' }
    : null

  return (
    <div
      style={cssError}
      className={className}
      onClick={props.openPopup}
    >
      <p>
        {props.value}
      </p>
      
    </div>
  )
}

export default InputField;