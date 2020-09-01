import React from 'react';
import Table from './Table';
import DatePicker from '../Inputs/DatePicker';
import Tabs from './Tabs'
import DateFilter from './DateFilter';


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

  handleSorting = (e) => {
    const name = e.target.name;

    const getNextSwitchValue = (current) => {
      const opts = ['off', 'up', 'down'];

      const newIndexInOpts = opts.findIndex((item) => item === current);

      return opts[newIndexInOpts + 1] || opts[0];
    };

    if (name === 'sortingBySum') this.setState({ sortingByDate: 'off' });
    if (name === 'sortingByDate') this.setState({ sortingBySum: 'off' });
    if (name === 'sortingByCategory') this.setState({ sortingByTags: 'off' });
    if (name === 'sortingByTags') this.setState({ sortingByCategory: 'off' });

    this.setState((state) => ({ [name]: getNextSwitchValue(state[name]) }));
  }


  handleDateFilter = (name, value) => {
    this.setState({ [name]: value });
  }

  getSelectedByPeriod = () => {
    const { firstDate, lastDate } = this.state;

    const newTransactions = [...this.props.transactions].filter((item) => (
      item.date >= firstDate && item.date <= lastDate
    ));

    return newTransactions;
  }


  sortBy = (list, prop, switcher) => {
    const sortUp = (a, b) => {
      if (a[prop] > b[prop]) return 1;
      if (a[prop] < b[prop]) return -1;
      return 0;
    }

    const sortDown = (a, b) => {
      if (a[prop] < b[prop]) return 1;
      if (a[prop] > b[prop]) return -1;
      return 0;
    }


    if (this.state[switcher] === 'off') {
      return list;
    }

    if (this.state[switcher] === 'up') {
      return list.sort(sortUp)
    }

    if (this.state[switcher] === 'down') {
      return list.sort(sortDown)
    }
  }


  getSortedList = () => {
    let sortedList = this.getSelectedByPeriod();

    sortedList = this.sortBy(sortedList, 'sum', 'sortingBySum');
    sortedList = this.sortBy(sortedList, 'date', 'sortingByDate');
    sortedList = this.sortBy(sortedList, 'category', 'sortingByCategory');

    return sortedList;
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

    const sortedList = this.getSortedList();

    const tab1 = (
      <>
        <div className="sortings">
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
          transactions={sortedList}
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