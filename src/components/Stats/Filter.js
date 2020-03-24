import React from 'react';
import DateInput from '../Form/DateInput';
import styles from '../Form/form.module.css';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: this.props.dateInterval[0],
      endDate: this.props.dateInterval[1]
    }
  }

  dateInputsHandler = (name, value) => {
    this.setState ({[name]: value}, () => {
      this.props.upData([this.state.startDate, this.state.endDate]);
      console.log(this.state.startDate,' ', this.state.endDate)
    });
  }

  render () {
    return (
      <div className={'filter ' + this.props.className}>
        <ul>
          <li>за все время</li>
          <li>этот месяц</li>
          <li>диапазон:<div className='dateRange'>
          <DateInput
            className={`${styles.field} ${styles.date}`}
            name='startDate'
            type='date'
            handler={this.dateInputsHandler}
            value={this.state.startDate} />

          <span> ---- </span>

          <DateInput
            className={`${styles.field} ${styles.date}`}
            name='endDate'
            type='date'
            handler={this.dateInputsHandler}
            value={this.state.endDate} />
        </div></li>
        </ul>
        

        <ul>
            <li>Доходы</li>
            <li>Расходы</li>
            <br></br>
            <li>Выбрать категории</li>
            <br></br>
            <li>Выбрать теги</li>
          </ul>
      </div>
    )
  }
}

export default Filter;