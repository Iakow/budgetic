import React from 'react';
import PopUp from './PopUp';
import css from './input.module.css';
import InputField from './InputField';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false }
  }


  toogleIsOpen = () => this.setState((state) => ({ isOpen: !state.isOpen }))


  handleSelect = (e) => {
    this.props.handler(this.props.name, e.target.name)
  }


  autoClose = e => { if (e.target.className.includes('popup_container')) this.toogleIsOpen() }


  render() {
    const { options, value } = this.props;

    const optionsRender = options.map((option, i) => (
      <li key={i}>
        <label className={css.option}>
          {option}
          <input
            name={option}
            type="radio"
            checked={value === option}
            onChange={this.handleSelect}
            onClick={this.toogleIsOpen}
          />
        </label>
      </li>
    ))

    return (
      <>
        <InputField
          openPopup={this.toogleIsOpen}
          value={value}
          placeholder="Категория"
        />

        <PopUp
          visible={this.state.isOpen}
          cancel={this.toogleIsOpen}
          autoClose={this.autoClose}
        >
          <ul className={css.options}>
            {optionsRender}
          </ul>
        </PopUp>
      </>
    )
  }
}

export default Select;