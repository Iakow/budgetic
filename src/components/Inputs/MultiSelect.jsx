import React from 'react';
import PopUp from './PopUp';
import css from './input.module.css';
import InputField from './InputField';


class MultiSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueBuffer: null,
      isOpen: false,
    }
  }


  openPopup = () => {
    this.setState({
      valueBuffer: [...this.props.value],
      isOpen: true,
    });
  }


  cancel = () => {
    const { handler, name } = this.props;

    handler(name, this.state.valueBuffer);

    this.setState({
      isOpen: false,
      valueBuffer: null,
    });
  }


  submit = () => {
    this.setState({
      valueBuffer: null,
      isOpen: false,
    });
  }


  autoClose = (e) => {
    if (e.target.className.includes('popup_container')) this.cancel(e);
  }


  handleSelect = (e) => {
    const { handler, name, value } = this.props;
    const option = e.target.name;
    let newValue = [...value];

    const isOptUnchecked = newValue.some((item) => item === option);

    if (isOptUnchecked) {
      newValue = newValue.filter((item) => item !== option)
    } else {
      newValue.push(option);
    }

    handler(name, newValue);
  }


  render() {
    const { isOpen } = this.state;
    const { options, value } = this.props;

    const optionsRender = options.map((option, i) => (
      <li key={i}>
        <label className={css.option}>
          {option}
          <input
            type="checkbox"
            name={option}
            checked={value.some((tag) => tag === option)}
            onChange={this.handleSelect}
          />
        </label>
      </li>
    ));

    return (
      <>
        <InputField
          openPopup={this.openPopup}
          value={value}
          placeholder="Теги"
          bullet="# "
          textStyle={{
            fontSize: 15,
            textTransform: "lowercase",
          }}
        />

        <PopUp
          controlled
          visible={isOpen}
          submit={this.submit}
          cancel={this.cancel}
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

export default MultiSelect;