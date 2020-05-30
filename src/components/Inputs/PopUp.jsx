import React from 'react';
import css from './input.module.css';

const PopUp = (props) => {
  const controlBlock = (props.controlled === true) ? (
    <div className={css.buttonsBlock} >
      <button className={css.button} onClick={props.cancel}> ОТМЕНА </button>
      <button className={css.button} onClick={props.submit}> УСТАНОВИТЬ </button>
    </div>
  ) : null;

  return (props.visible) ? (
    <div className={css.popupContainer} onMouseDown={props.autoClose} >
      <div className={css.popup} >
        <div className={css.content} >
          {props.children}
        </div>

        {controlBlock}
      </div>
    </div>
  ) : null
}

export default PopUp;