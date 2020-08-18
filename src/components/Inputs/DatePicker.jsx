import React from 'react';
import DateStrip from './DateStrip';
import PopUp from './PopUp';
import css from './input.module.css';
import InputField from './InputField';


class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.value,
      tempDate: null,
      isOpen: false
    }
  }


  getDateString = (timestamp) => {
    const d = new Date(timestamp);

    const DD = (d.getDate() > 9) ? d.getDate() : `0${d.getDate()}`;
    const MM = ((d.getMonth() + 1) > 9) ? d.getMonth() + 1 : `0${d.getMonth() + 1}`;
    const YYYY = d.getFullYear();

    const HH = ((d.getHours() > 9)) ? d.getHours() : `0${d.getHours()}`;
    const MI = ((d.getMinutes() > 9)) ? d.getMinutes() : `0${d.getMinutes()}`;

    return `${DD}.${MM}.${YYYY} - ${HH}:${MI}`
  }


  toogleIsOpen = () => {
    this.state.isOpen ?
      document.body.classList.remove('noOverScroll')
      :
      document.body.classList.add('noOverScroll');

    this.setState((state) => ({
      isOpen: !state.isOpen
    }))
  }


  openPopup = () => {
    this.setState((state) => ({ tempDate: state.date }));
    this.toogleIsOpen();
  }


  getValue = (mode, value) => {
    const date = new Date(this.state.tempDate);

    if (mode === 'fullYear') date.setFullYear(value);
    if (mode === 'month') date.setMonth(value);
    if (mode === 'day') date.setDate(value);
    if (mode === 'hours') date.setHours(value);
    if (mode === 'minutes') date.setMinutes(value);

    this.setState({ tempDate: date.getTime() })
  }


  cancel = (e) => {
    e.stopPropagation(); //?
    this.toogleIsOpen();
  }


  submit = (e) => {
    e.stopPropagation();
    this.setState((state) => ({ date: state.tempDate }));
    this.toogleIsOpen();
    this.props.handler('date', this.state.tempDate);
  }


  autoClose = e => { if (e.target.className.includes('popup_container')) this.toogleIsOpen() }


  render() {
    const modes = ['fullYear', 'month', 'day', 'hours', 'minutes'];
    const stripItemHeight = 50;
    const date = new Date(this.state.tempDate);
    const dateString = this.getDateString(this.state.date);

    return (
      <>
        <InputField
          openPopup={this.openPopup}
          value={dateString}
          placeholder="Дата и время"
        />

        <PopUp
          controlled
          visible={this.state.isOpen}
          submit={this.submit}
          cancel={this.cancel}
          autoClose={this.autoClose}
        >
          <div className={css.dateBlock}>
            <DateStrip
              mode={modes[2]}
              stripItemHeight={stripItemHeight}
              value={date.getDate()}
              sendValueUp={this.getValue}
            />

            <DateStrip
              mode={modes[1]}
              stripItemHeight={stripItemHeight}
              value={date.getMonth()}
              sendValueUp={this.getValue}
            />

            <DateStrip
              mode={modes[0]}
              stripItemHeight={stripItemHeight}
              value={date.getFullYear()}
              sendValueUp={this.getValue}
            />
          </div>

          <div className={css.timeBlock} >
            <DateStrip
              mode={modes[3]}
              stripItemHeight={stripItemHeight}
              value={date.getHours()}
              sendValueUp={this.getValue}
            />

            <span className={css.timeSeparator} >:</span>

            <DateStrip
              mode={modes[4]}
              stripItemHeight={stripItemHeight}
              value={date.getMinutes()}
              sendValueUp={this.getValue}
            />
          </div>
        </PopUp>
      </>
    )
  }
}

export default DatePicker;