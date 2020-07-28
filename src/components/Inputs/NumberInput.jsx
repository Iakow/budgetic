import React from 'react';
import InputField from './InputField';
import KeyBoard from './KeyBoard';

class NumberInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.getInitialValue(),
      valueBuffer: null,
      isOpen: false,
      showCursor: false,
      isNeedCalculate: false,
      error: false
    }
  }


  getInitialValue = () => {
    return this.props.value ? `${this.props.value}` : '';
  }


  handleKeyboard = (e) => {
    const { value } = this.state;
    const key = e.target.value;

    const checkAndSetNewValue = (newValue) => {
      this.setState({
        value: newValue,
        isNeedCalculate: isNaN(+newValue),
      });
    }

    if (key === 'C') {
      checkAndSetNewValue('');
    } else if (key === '<<') {
      checkAndSetNewValue(value.slice(0, value.length - 1));
    } else if (key !== '=' && key !== 'OK') {
      checkAndSetNewValue(value + key);
    }

    if (key === '=') {
      try {
        this.setState({
          // eslint-disable-next-line
          value: eval(value).toString(),
          isNeedCalculate: false,
        });
      } catch (err) {
        console.error('Error!');
        this.blinkError();
      }
    }

    if (key === 'OK') {
      const valueNum = +value;

      if (valueNum > 0) {
        //this.setState({ value: valueNum.toString() })
        this.props.handler('sum', valueNum.toString())
        this.closeKeyboard();
      } else if (valueNum === 0) {
        this.setState({ value: '' });
        this.closeKeyboard();
      } else {
        this.blinkError();
      }
    }
  }


  openKeyboard = () => {
    this.timerID = setInterval(() => {
      this.setState((state) => ({
        showCursor: !state.showCursor
      }));
    }, 700);

    this.setState({
      isOpen: true,
      valueBuffer: this.state.value
    });
  }


  blinkError = () => {
    this.setState({ error: true });
    navigator.vibrate(150);

    setTimeout(() => {
      this.setState({ error: false })
    }, 300)
  }


  closeKeyboard = () => {
    clearInterval(this.timerID);
    this.setState({ isOpen: false });
  }


  autoClose = e => {
    if (e.target.className.includes('Container')) {
      this.closeKeyboard();
      this.setState((state) => ({
        value: state.valueBuffer,
        valueBuffer: null
      }))
    }
  }


  render() {
    const { value, showCursor, isOpen, error } = this.state;
    const cursor = showCursor ? '|' : ' ';

    return (
      <>
        <InputField
          error={error}
          type="number"
          openPopup={this.openKeyboard}
          value={isOpen ? value + cursor : value}
          userStyle={value ? this.props.userStyle : null}
          placeholder="Сумма"
        />

        <KeyBoard
          calculateble={this.state.isNeedCalculate}
          autoClose={this.autoClose}
          visible={this.state.isOpen}
          sendValue={this.handleKeyboard}
        />
      </>
    )
  }
}

export default NumberInput;