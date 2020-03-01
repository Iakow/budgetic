import React from 'react';
/* import { Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes'; 
import TransactionRow from './TransactionRow';
import TransactionForm from '../Form/TransactionForm';*/
import Table from './Table';

/* Здесь будут две вкладки для таблицы и диаграммы */

class Stats extends React.Component {
  render() {
    return (
      <Table
        db={this.props.db}
        transactions={this.props.statsTable}
        tags={this.props.tags}
        categories={this.props.categories} />
    )
  }
}

export default Stats; 