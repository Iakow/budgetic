import React from 'react';
import PopUp from './PopUp';
import css from './input.module.css';
import InputField from './InputField';


class MultiSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueMap: this.getValueMap(),
      valueMapBuffer: null,
      isOpen: false,
    }
  }


  openPopup = () => {
    this.setState((state) => ({
      valueMapBuffer: state.valueMap,
      isOpen: !state.isOpen,
    }));
  }


  cancel = (e) => {
    e.stopPropagation();

    this.setState((state) => ({
      isOpen: false,
      valueMap: state.valueMapBuffer,
      valueMapBuffer: null,
    }));
  }


  submit = (e) => {
    e.stopPropagation();

    this.setState({
      valueMapBuffer: null,
      isOpen: false,
    });

    this.props.handler('tag', this.getValue());
  }


  autoClose = (e) => {
    if (e.target.className.includes('popupContainer')) this.cancel(e);
  }


  handleSelect = (e) => {
    const i = +e.target.name;
    const newValueMap = [...this.state.valueMap];

    newValueMap[i] = !newValueMap[i];

    this.setState({ valueMap: newValueMap });
  }


  getValue = () => this.props.options.filter((item, i) => this.state.valueMap[i]);


  getValueMap = () => {
    const { value, options } = this.props;

    if (value) {
      return options.map((option) => value.some((item) => item === option));
    } else {
      return options.map(() => false);
    }
  }


  render() {
    const value = this.getValue();
    const { valueMap, isOpen } = this.state;
    const { options } = this.props;

    const optionsRender = options.map((item, i) => (
      <li key={i}>
        <label className={css.optionsItem}>
          {item}
          <input name={i} type="checkbox" checked={valueMap[i]} onChange={this.handleSelect} />
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