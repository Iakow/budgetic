import React from 'react';
import DatePicker from '../Inputs/DatePicker';
import Table from './Table';

class TransactionFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateStart: this.props.dateInterval[0],
      dateEnd: this.props.dateInterval[1],
      sortSum: 'off',
      sortTime: 'off',
      sortCat: 'off',
      sortTag: 'off'
    }
  }


  setSorting = (e) => {
    const name = e.target.name;

    //возвращает строку на основе входящей строки, состояние переключателя
    const switchValue = (current) => {
      const opts = ['off', 'up', 'down'];

      const newIndexInOpts = opts.findIndex((item) => item === current);

      return opts[newIndexInOpts + 1] || opts[0];
    };

    // сбрасываем взаимоисключающие настройки
    if (name === 'sortSum') this.setState({ sortTime: 'off' });
    if (name === 'sortTime') this.setState({ sortSum: 'off' });
    if (name === 'sortCat') this.setState({ sortTag: 'off' });
    if (name === 'sortTag') this.setState({ sortCat: 'off' });

    // надо функцией
    this.setState({ [name]: switchValue(this.state[name]) });
  }

  getSortedByDate = () => {
    const sortTime = this.state.sortTime;

    if(sortTime === 'off') return this.getFilteredByDateTransactions();
    if(sortTime === 'up') return [...this.getFilteredByDateTransactions()].sort((a, b) => a.date - b.date);
    if(sortTime === 'down') return [...this.getFilteredByDateTransactions()].sort((a, b) => b.date - a.date);
  }


  setDateFilter = (name, value) => {
    this.setState({ [name]: value })
  }

  getFilteredByDateTransactions = () => {
    const {dateStart, dateEnd} = this.state;
    const currentTransactions = [...this.props.transactions];

    let newTransactions = currentTransactions.filter((item) => (
      item.date >= dateStart && item.date <= dateEnd
    ));

    return newTransactions;
  }

  /* Сортировки берут отфильтрованный по времени массив и сортируют
     Сортировки должны срабатывать по клику на кнопку, поэтому должны находиться в ее хендлере
       */


  render() {
    const { dateStart, dateEnd, sortSum, sortTime, sortCat, sortTag } = this.state;

    return (
      <>
        <div className="panel">
          <DatePicker
            value={dateStart}
            handler={this.setDateFilter}
            handleName="dateStart"
          /> -
          <DatePicker
            value={dateEnd}
            handler={this.setDateFilter}
            handleName="dateEnd"
          />
        </div>
        <div className="body">
          <button onClick={this.setSorting} name="sortSum">{`sortSum: ${sortSum}`}</button>
          <button onClick={this.setSorting} name="sortTime">{`sortTime: ${sortTime}`}</button>
          <button onClick={this.setSorting} name="sortCat">{`sortCat: ${sortCat}`}</button>
          <button onClick={this.setSorting} name="sortTag">{`sortTag: ${sortTag}`}</button>
        </div>

        <Table
          db={this.props.db}
          transactions={this.getSortedByDate()}
          tags={this.props.tags}
          categories={this.props.categories}
        />
      </>
    )
  }
}

export default TransactionFilter;