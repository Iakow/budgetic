import React from 'react';
import Table from './Table';
import DatePicker from '../Inputs/DatePicker';


class Stats extends React.Component {
  constructor(props) {
    super(props);

    const { transactions } = this.props;

    this.state = {
      selectedTransactions: this.props.transactions,
      firstDate: transactions[transactions.length - 1].date,
      lastDate: transactions[0].date,

      sortingBySum: 'off',
      sortingByDate: 'off',
      sortingByCategory: 'off',
      sortingByTags: 'off'
    }
  }

  handleSorting = (e) => {
    const name = e.target.name;

    //возвращает строку на основе входящей строки, состояние переключателя
    const switchValue = (current) => {
      const opts = ['off', 'up', 'down'];

      const newIndexInOpts = opts.findIndex((item) => item === current);

      return opts[newIndexInOpts + 1] || opts[0];
    };

    // сбрасываем взаимоисключающие настройки
    if (name === 'sortingBySum') this.setState({ sortingByDate: 'off' });
    if (name === 'sortingByDate') this.setState({ sortingBySum: 'off' });
    if (name === 'sortingByCategory') this.setState({ sortingByTags: 'off' });
    if (name === 'sortingByTags') this.setState({ sortingByCategory: 'off' });

    // надо функцией
    this.setState({ [name]: switchValue(this.state[name]) });
    this.sortByDate().sortBySum();

    // проблема с чейнингом в том, что в каждом вызове сетСейт - а это перерендеринг
    // вариант - не через стейт, а через простое св-во
    // вариант - просто вложенные 4 функции, но это пиздец
    // вариант - отказаться от чейнинга и просто поочередно вызвать четыре функции внутри одного метода на локальной переменной, а в конце сетСтейт - ОК.
  }


  handleDateFilter = (name, value) => {
    this.setState({ [name]: value });
    this.getSelectedByPeriod();
  }


  sortByDate = () => {
    const { sortingByDate, selectedTransactions } = this.state;

    if (sortingByDate === 'off') { };

    if (sortingByDate === 'up') {
      this.setState({
        selectedTransactions: [...selectedTransactions].sort((a, b) => a.date - b.date)
      })
    }

    if (sortingByDate === 'down') {
      this.setState({
        selectedTransactions: [...selectedTransactions].sort((a, b) => b.date - a.date)
      })
    }

    return this;
  }

  sortBySum = () => {
    const { sortingBySum, selectedTransactions } = this.state;

    if (sortingBySum === 'off') { };

    if (sortingBySum === 'up') {
      this.setState({
        selectedTransactions: [...selectedTransactions].sort((a, b) => a.sum - b.sum)
      })
    }

    if (sortingBySum === 'down') {
      this.setState({
        selectedTransactions: [...selectedTransactions].sort((a, b) => b.sum - a.sum)
      })
    }

    return this;
  }


  getSelectedByPeriod = () => {
    const { firstDate, lastDate } = this.state;

    const newTransactions = [...this.props.transactions].filter((item) => (
      item.date >= firstDate && item.date <= lastDate
    ));

    this.setState({ selectedTransactions: newTransactions })

    return this;
  }


  render() {
    const { firstDate, lastDate, sortingBySum, sortingByDate, sortingByCategory, sortingByTags } = this.state;

    return (
      <>
        <div className="panel">
          <DatePicker
            value={firstDate}
            handler={this.handleDateFilter}
            handleName="firstDate"
          /> -
          <DatePicker
            value={lastDate}
            handler={this.handleDateFilter}
            handleName="lastDate"
          />
        </div>
        <div className="body">
          <button
            onClick={this.handleSorting}
            name="sortingBySum"
          >
            {`Sum: ${sortingBySum}`}
          </button>

          <button
            onClick={this.handleSorting}
            name="sortingByDate"
          >
            {`Date: ${sortingByDate}`}
          </button>

          <button
            onClick={this.handleSorting}
            name="sortingByCategory"
          >
            {`Category: ${sortingByCategory}`}
          </button>

          <button
            onClick={this.handleSorting}
            name="sortingByTags"
          >
            {`Tags: ${sortingByTags}`}
          </button>
        </div>

        <Table
          db={this.props.db}
          transactions={this.state.selectedTransactions}
          tags={this.props.tags}
          categories={this.props.categories}
        />
      </>
    )
  }
}

export default Stats; 