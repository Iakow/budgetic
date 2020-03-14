import React from 'react';

const DateInput = (props)=> {
  const timestampToHtmlString = (timestamp)=> {
    const d = new Date(timestamp);

    const DD = (d.getDate()>9) ? d.getDate() : `0${d.getDate()}`;
    const MM = ((d.getMonth()+1)>9) ? d.getMonth()+1 : `0${d.getMonth()+1}`;
    const YYYY = d.getFullYear();

    const HH = ((d.getHours()>9)) ? d.getHours() : `0${d.getHours()}`;
    const MI = ((d.getMinutes()>9)) ? d.getMinutes() : `0${d.getMinutes()}`;

    return YYYY+'-'+MM+'-'+DD+'T'+HH+':'+MI;
  }

  const htmlStirngToTimestamp = (htmlDate)=> {
    const YYYY = +htmlDate.slice(0, 4);
    const MM = +htmlDate.slice(6,7) - 1;
    const DD = +htmlDate.slice(8,10);
    const HH = +htmlDate.slice(11,13);
    const MI = +htmlDate.slice(14);

    const date = new Date();

    date.setFullYear(YYYY, MM, DD);
    date.setHours(HH, MI);

    return date.getTime();
  }

  const upState = (e) => {
    props.handler(props.name, htmlStirngToTimestamp(e.target.value));
  }

  return (
    <input
      className={props.className}
      type='datetime-local'
      onChange={upState}
      value={timestampToHtmlString(props.value)}
    />
  )
}

export default DateInput;

/* 
  Для фильтра этот компонент должен быть без времени, только дата.
*/