import React from 'react';
import css from './input.module.css';

const InputField = (props) => {
  const value = props.value;
  console.log(props.value.length)
  const className = (props.type === 'number') ?
    `${css.inputField}  ${css.activeInput}`
    : css.inputField;

  const cssError = (props.error) ? { backgroundColor: 'red' } : null;

  let content;

  if (!Array.isArray(value)) {
    content = (
      <span
        className={css.inputField_item}
        style={props.userStyle}>
        {value}
      </ span>
    )
  } else {
    content = (
      value.map((item) => (
        <span
          key={item}
          className={css.inputField_item}
          style={props.userStyle}
        >
          {props.bullet || null}{item}
        </span>)
      )
    )
  }


  return (
    <div
      style={cssError}
      className={className}
      onClick={props.openPopup}
    >
      <div className={css.inputField_placeholder}>
        <div>
          {value.length !== 0 ? props.placeholder : null}
        </div>
      </div>

      {value.length === 0 ? props.placeholder : content}
    </div>
  )
}

export default InputField;