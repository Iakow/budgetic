import React from 'react';

export default class ActionCard extends React.Component {

  formatDate = (timestamp) => {
    const d = new Date(timestamp);

    const DD = (d.getDate() > 9) ? d.getDate() : `0${d.getDate()}`;
    const MM = ((d.getMonth() + 1) > 9) ? d.getMonth() + 1 : `0${d.getMonth() + 1}`;
    const YYYY = d.getFullYear();

    const HH = ((d.getHours() > 9)) ? d.getHours() : `0${d.getHours()}`;
    const MI = ((d.getMinutes() > 9)) ? d.getMinutes() : `0${d.getMinutes()}`;
    /*     const SEC = ((d.getSeconds()>9)) ? d.getSeconds() : `0${d.getSeconds()}`;
     */
    const month = [
      'янв',
      'фев',
      'мар',
      'апр',
      'май',
      'июн',
      'июл',
      'авг',
      'сен',
      'окт',
      'ноя'
    ]
    return `${DD} ${month[d.getMonth()]} ${YYYY}`
  }

  render() {
    const { sum, category, date, tags } = this.props.transaction;
    return (
      <div
        className='card'
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: 10,
          justifyContent: 'space-between'
        }}>
        <div>
          <div>{category}</div>
          <div>{this.formatDate(date)}</div>
        </div>
        <div>{tags}</div>
        <div>{sum}</div>
      </div>
    )
  }
}