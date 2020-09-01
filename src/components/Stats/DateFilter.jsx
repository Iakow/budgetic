import React from 'react';
import DatePicker from '../Inputs/DatePicker'

const DateFilter = (props) => {
  return (
    <div className="filter">
      <DatePicker
        value={props.firstDate}
        handler={props.handler}
        handleName="firstDate"
      /> -
      <DatePicker
        value={props.lastDate}
        handler={props.handler}
        handleName="lastDate"
      />
    </div>
  )
}

export default DateFilter;