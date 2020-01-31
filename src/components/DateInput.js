import React from 'react';

const DateInput = (props)=> {
  const timestampToString = (timestamp)=> {
    const d = new Date(timestamp);

    const DD = (d.getDate()>9) ? d.getDate() : `0${d.getDate()}`;
    const MM = ((d.getMonth()+1)>9) ? d.getMonth()+1 : `0${d.getMonth()+1}`;
    const YYYY = d.getFullYear();

    const HH = ((d.getHours()>9)) ? d.getHours() : `0${d.getHours()}`;
    const MI = ((d.getMinutes()>9)) ? d.getMinutes() : `0${d.getMinutes()}`;

    return YYYY+'-'+MM+'-'+DD+'T'+HH+':'+MI;
  }

  return (
    <input
    name={props.name}
    type='datetime-local' 
    onChange={props.handler}
    value={timestampToString(props.value)}
  />
  )
}

export default DateInput;