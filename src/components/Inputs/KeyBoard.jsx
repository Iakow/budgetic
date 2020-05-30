import React from 'react';
import css from './input.module.css';

const KeyBoard = (props) => {
  const done = props.calculateble ? '=' : 'OK';

  return (
    props.visible
      ? (
        <div className={css.keyboardContainer} onClick={props.autoClose}>
          <div className={css.keyboard}>
            <div className={css.keyboardRow}>
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="1" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="2" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="3" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="(" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value=")" />
            </div>
            <div className={css.keyboardRow}>
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="4" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="5" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="6" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="+" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="*" />
            </div>
            <div className={css.keyboardRow}>
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="7" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="8" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="9" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="-" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="/" />
            </div>
            <div className={css.keyboardRow}>
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="." />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="0" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value={done} />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="<<" />
              <input type="button" tabIndex="-1" className={css.key} onClick={props.sendValue} value="C" />
            </div>
          </div>
        </div>
      )
      : (null)
  )
}

export default KeyBoard;