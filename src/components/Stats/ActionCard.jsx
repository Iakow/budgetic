import React from 'react';
import CSS from './actioncard.module.css';


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
    const { sum, category, date, tag } = this.props.transaction;

    return (
      <div className={CSS.card}>
        <div className={category&sum}>
          <div className={CSS.category}>{category}</div>
          <div className={CSS.date}>{this.formatDate(date)}</div>
        </div>
        <div className={CSS.tags}>
          {tag.map((tag) => <div className={CSS.tag}>{tag}</div>)}
        </div>
        <div className={((sum >= 0)) ? CSS.sum : `${CSS.sum_red} ${CSS.sum}`}> 
          {(sum >= 0) ? `+${sum}` : `${sum}`}
        </div>
      </div>
    )
  }
}