import React from 'react';
import SortingBlock from './SortingBlock';
import ActionCard from './ActionCard';

export default class ActionsList extends React.Component {
  constructor(props) {
    super(props); /* db, transactions, tags, categories */

    this.state = {
      sortingBySum: 'off',
      sortingByDate: 'off',
      sortingByCategory: 'off',
      sortingByTags: 'off'
    }
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
    let list = this.props.transactions;

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
      sortingBySum,
      sortingByDate,
      sortingByCategory,
      sortingByTags
    } = this.state;

    return (
      <>
        <SortingBlock
          bySum={sortingBySum}
          byDate={sortingByDate}
          byCategory={sortingByCategory}
          byTags={sortingByTags}
          handler={this.handleSorting}
        />

        {this.getSortedList().map((transaction) => {
          return (
            <ActionCard
              key={transaction.id}
              transaction={transaction}
            />
          )
        })}
      </>



    )
  }

}
