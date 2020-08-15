import React from 'react';
import css from './input.module.css';

const InputField = (props) => {
  const { value, placeholder, bullet, textStyle, boxStyle } = props;

  const isNoValue = value.length === 0;
  const valueIsMultiple = Array.isArray(value);

  const getValueRender = () => {
    if (isNoValue) return placeholder;

    if (valueIsMultiple) {
      return (
        value.map((item) => (
          <span key={item} className={css.inputField_item} style={textStyle}>
            {bullet || null}{item}
          </span>
        ))
      )
    } else {
      return (
        <span className={css.inputField_item} style={textStyle}>
          {value}
        </span>
      )
    }
  }

  const minimizedPlaceholder = placeholder ? isNoValue ? null :
    (
      <span className={css.inputField_placeholder}>
        {placeholder}
      </span>
    ) : null;

  return (
    <div
      tabIndex="0"
      style={boxStyle}
      className={css.inputField}
      onClick={props.openPopup}
    >
      {minimizedPlaceholder}
      {getValueRender()}
    </div>
  )
}

export default InputField;