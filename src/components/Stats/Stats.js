import React from 'react';
import Tabs from './Tabs'
import DateFilter from './DateFilter';
import ActionsList from './ActionsList';

class Stats extends React.Component {
  constructor(props) {
    super(props);

    const { transactions } = this.props;

    this.state = {
      firstDate: transactions[transactions.length - 1].date,
      lastDate: transactions[0].date
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


  render() {
    const { firstDate, lastDate } = this.state;

    return (
      <>
        <DateFilter
          firstDate={firstDate}
          lastDate={lastDate}
          handler={this.handleDateFilter}
        />

        <Tabs
          tabs={[<ActionsList />, "Diagramm"]}
          titles={["Table", "Diagramm"]}
        />
      </>
    )
  }
}

export default Stats; 