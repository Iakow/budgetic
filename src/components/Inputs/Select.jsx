import React from 'react';
import PopUp from './PopUp';
import css from './input.module.css';
import InputField from './InputField';

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || null,
      isOpen: false
    }
  }


  toogleIsOpen = () => this.setState((state) => ({ isOpen: !state.isOpen }))


  handleSelect = (e) => {
    this.setState({ value: e.target.name })
    this.props.handler('category', e.target.name)
  }


  autoClose = e => { if (e.target.className.includes('popupContainer')) this.toogleIsOpen() }


  render() {
    const { value } = this.state;
    const { options } = this.props;

    const optionsRender = options.map((option, i) => (
      <li key={i}>
        <label className={css.optionsItem}>
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
        <InputField openPopup={this.toogleIsOpen} value={value || 'Выбрать категори'} />
        <PopUp visible={this.state.isOpen} cancel={this.toogleIsOpen} autoClose={this.autoClose}>
          <ul>
            {optionsRender}
          </ul>
        </PopUp>
      </>
    )
  }
}

export default Select;