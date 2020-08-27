import React from 'react';
import Table from './Table';
import Diagram from './Diagram';
//import Filter from './Filter';
import TransactionFilter from './TransactionFilter'


/* с новым пропсом массив надо бы отдать фильтру, чтобы тот вернул что надо. Как?
А что, если состояние фильтра тоже держать здесь???*/
class Stats extends React.Component {
  constructor(props) {
    super(props);

    /* 
      transactions={transactions} [{}, {}, {}]
      tags={tags} ['','','']
      categories={categories} ['','','']
      db={USER_DB} 
    */

    const startFiltersDate = this.props.transactions[this.props.transactions.length - 1].date;
    const endFiltersDate = this.props.transactions[0].date;

    this.state = {
      tab: 1,
      dateInterval: [startFiltersDate, endFiltersDate]
    }
  }


  getFilteredTransactions = () => {
    const firstDate = this.state.dateInterval[0];
    const roundedLastDate = new Date(this.state.dateInterval[1]).setHours('23', '59');

    return this.props.transactions.filter((transaction) => {
      return (firstDate <= transaction.date && transaction.date <= roundedLastDate);
    })
  }


  setDateInterval = (arr) => {
    this.setState({ dateInterval: arr })
  }


  render() {
    const startFiltersDate = this.props.transactions[this.props.transactions.length - 1].date;
    const endFiltersDate = this.props.transactions[0].date;

    return (
      <TransactionFilter
        dateInterval={[startFiltersDate, endFiltersDate]}
        db={this.props.db}
        transactions={this.getFilteredTransactions()}
        tags={this.props.tags}
        categories={this.props.categories}
      >

      </TransactionFilter>
    )
  }

  /* render() {
    const { tab } = this.state;

    let tabRender = (
      <Table
        db={this.props.db}
        transactions={this.getFilteredTransactions()}
        tags={this.props.tags}
        categories={this.props.categories}
      />
    )

    if (tab === 2) {
      tabRender = (
        <Diagram />
      )
    }

    if (tab === 3) {
      tabRender = (
        <Filter
          className={(this.state.tab !== 3) ? 'hidden' : null}
          upData={this.setDateInterval}
          dateInterval={this.state.dateInterval}
        /> 
      )
    }


    return (
      <div className='stats'>
        <ul className='tabs'>
          <li
            className='tab'
            onClick={() => { this.setState({ tab: 1 }) }}
          >
            Table
          </li>

          <li
            className='tab'
            onClick={() => { this.setState({ tab: 2 }) }}
          >
            Diagram
          </li>

          <li
            className='tab'
            onClick={() => { this.setState({ tab: 3 }) }}
          >
            Filter
          </li>
        </ul>

        <div className='stats-content'>
          {tabRender}
        </div>
      </div>
    )
  } */
}

export default Stats; 