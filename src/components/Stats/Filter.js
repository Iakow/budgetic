import React from 'react';
import DateInput from '../Form/DateInput';
import styles from '../Form/form.module.css';

class Filter extends React.Component {
  constructor(props) {
    super(props);

/* как вернуться к широкому интервалу, если я сюда передаю только уже отфильтрованный?
   как мне сохранять стейт фильтра, если он не рендерится при переходе на другую вкладку? */

    this.state = {
      startDate: this.props.arr[this.props.arr.length - 1].date,
      endDate: this.props.arr[0].date
    }
  }

  
  handler = (name, value)=> {
    this.setState ({[name]: value}, ()=> {
      let array = this.props.arr.filter((transaction)=>{
        return (this.state.startDate <= transaction.date && transaction.date <= this.state.endDate);
      })
      console.log(array);
      this.props.handler(array);
    });
    
  }


  render () {
    return (
      <div className="filter">
        <ul>
          <li>доходы/расходы (тут как-то разделить логику диаграммы и таблицы)</li>
          <li></li>
        </ul>
        <div className='dateRange'>
          <DateInput
            className={`${styles.field} ${styles.date}`}
            name='startDate'
            type='date'
            handler={this.handler}
            value={this.state.startDate} />

          <span> ---- </span>

          <DateInput
            className={`${styles.field} ${styles.date}`}
            name='endDate'
            type='date'
            handler={this.handler}
            value={this.state.endDate} />

          <p>и нахуя мне тут время в инпутах?</p>
        </div>
      </div>
    )
  }
}

export default Filter;