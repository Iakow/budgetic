import React from 'react';
import Table from './Table';
import Tabs from './Tabs'
import DateFilter from './DateFilter';
import SortingBlock from './SortingBlock'

/* !!! ПО ХОРОШЕМУ СОРТИРОВКА ДОЛЖНА ПРОИСХОДИТЬ В САМОМ СПИСКЕ */

class Stats extends React.Component {
  constructor(props) {
    super(props);

    const { transactions } = this.props;

    this.state = {
      firstDate: transactions[transactions.length - 1].date,
      lastDate: transactions[0].date,

      sortingBySum: 'off',
      sortingByDate: 'off',
      sortingByCategory: 'off',
      sortingByTags: 'off'
    }
  }


  handleDateFilter = (name, value) => {
    this.setState({ [name]: value });
  }


  getDateFilteredTransactions = () => {
    const { firstDate, lastDate } = this.state;

    return [...this.props.transactions].filter((item) => (
      item.date >= firstDate && item.date <= lastDate
    ));
  }


  handleSorting = (e) => {
    const name = e.target.name;

    const getNextSwitchValue = (currentValue) => {
      const opts = ['off', 'up', 'down'];

      const currentIndex = opts.findIndex((item) => item === currentValue);

      return opts[currentIndex + 1] || opts[0];
    };

    if (name === 'sortingBySum') this.setState({ sortingByDate: 'off' });
    if (name === 'sortingByDate') this.setState({ sortingBySum: 'off' });
    if (name === 'sortingByCategory') this.setState({ sortingByTags: 'off' });
    if (name === 'sortingByTags') this.setState({ sortingByCategory: 'off' });

    this.setState((state) => ({ [name]: getNextSwitchValue(state[name]) }));
  }


  getSortedList = () => {
    let list = this.getDateFilteredTransactions();

    const sortBy = (list, prop, switcher) => {
      if (this.state[switcher] === 'off') {
        return list;
      }
  
      if (this.state[switcher] === 'up') {
        return list.sort((a, b) => {
          if (a[prop] > b[prop]) return 1;
          if (a[prop] < b[prop]) return -1;
          return 0;
        })
      }
  
      if (this.state[switcher] === 'down') {
        return list.sort((a, b) => {
          if (a[prop] < b[prop]) return 1;
          if (a[prop] > b[prop]) return -1;
          return 0;
        })
      }
    }

    list = sortBy(list, 'sum', 'sortingBySum');
    list = sortBy(list, 'date', 'sortingByDate');
    list = sortBy(list, 'category', 'sortingByCategory');

    return list;
  }


  render() {
    const {
      firstDate,
      lastDate,
      sortingBySum,
      sortingByDate,
      sortingByCategory,
      sortingByTags
    } = this.state;

    const list = this.getSortedList();

    const tab1 = (
      <>
        <SortingBlock
          bySum={sortingBySum}
          byDate={sortingByDate}
          byCategory={sortingByCategory}
          byTags={sortingByTags}
          handler={this.handleSorting}
        />

        <Table
          db={this.props.db}
          transactions={list}
          tags={this.props.tags}
          categories={this.props.categories}
        />
      </>
    )

    return (
      <>
        <DateFilter
          firstDate={firstDate}
          lastDate={lastDate}
          handler={this.handleDateFilter}
        />

        <Tabs
          tabs={[tab1, "Diagramm"]}
          titles={["Table", "Diagramm"]}
        />
      </>
    )
  }
}

export default Stats; 