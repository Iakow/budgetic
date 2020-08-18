import React from 'react';
import CSS from './input.module.css';

const PopUp = (props) => {
  const controlBlock = (
    <div className={CSS.buttonsBlock} >
      <button className={CSS.button} onClick={props.cancel}> ОТМЕНА </button>
      <button className={CSS.button} onClick={props.submit}> OK </button>
    </div>
  );

  return (props.visible) ? (
    <div className={CSS.popup_container} onMouseDown={props.autoClose} >
      <div className={CSS.popup} >
        {props.children}

        {(props.controlled === true) ? controlBlock : null}
      </div>
    </div>
  ) : null
}

export default PopUp;