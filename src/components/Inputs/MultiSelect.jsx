import React from 'react';
import PopUp from './PopUp';
import css from './input.module.css';
import InputField from './InputField';


class MultiSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueMap: this.getValueMap(),
      tempValueMap: this.getValueMap(),
      isOpen: false,
    }
  }


  openPopup = () => {
    this.setState((state) => ({
      tempValueMap: state.valueMap,
      isOpen: !state.isOpen
    }));
  }


  toogleIsOpen = () => {
    this.setState((state) => ({
      isOpen: !state.isOpen
    }))
  }


  cancel = (e) => {
    e.stopPropagation();
    this.toogleIsOpen();
  }


  submit = (e) => {
    e.stopPropagation();
    this.setState((state) => ({ valueMap: state.tempValueMap }));
    this.toogleIsOpen();
  }

  
  autoClose = e => { if (e.target.className.includes('popupContainer')) this.toogleIsOpen() }


  handleSelect = (e) => {
    const i = +e.target.name;
    const newState = [...this.state.tempValueMap];

    newState[i] = !newState[i];

    this.setState({ tempValueMap: newState });
  }


  getValue = () => this.props.options.filter((item, i) => this.state.valueMap[i]);


  getValueMap = () => {
    const { value, options } = this.props;

    if (value) {
      return options.map((option) => value.some(item => item === option));
    } else {
      return options.map(() => false);
    }
  }


  render() {
    const value = this.getValue();
    const { tempValueMap, isOpen } = this.state;
    const { options } = this.props;

    const optionsRender = options.map((item, i) => (
      <li key={i}>
        <label className={css.optionsItem}>
          {item}
          <input name={i} type="checkbox" checked={tempValueMap[i]} onChange={this.handleSelect} />
        </label>

      </li>
    ));

    return (
      <div className={css.container}>
        <InputField openPopup={this.openPopup} value={"Выбрать теги: " + value} />

        <PopUp controlled visible={isOpen} submit={this.submit} cancel={this.cancel} autoClose={this.autoClose}>
          <ul>
            {optionsRender}
          </ul>
        </PopUp>
      </div>
    )
  }
}

export default MultiSelect;