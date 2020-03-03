import React from 'react';
/* import { Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes'; 
import TransactionRow from './TransactionRow';
import TransactionForm from '../Form/TransactionForm';*/
import Table from './Table';

/* Здесь будут две вкладки для таблицы и диаграммы */

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1
    }
  }
  render() {
    return (
      <div className='stats'>
      <ul className='tabs'>
        <li className='tab' onClick={()=>{this.setState({tabIndex: 1})}}>Table</li>
        <li className='tab' onClick={()=>{this.setState({tabIndex: 2})}}>Diagram</li>
        <li className='tab' onClick={()=>{this.setState({tabIndex: 3})}}>Filter</li>
      </ul>

      {(this.state.tabIndex === 1) ? 
      <Table
        db={this.props.db}
        transactions={this.props.statsTable}
        tags={this.props.tags}
        categories={this.props.categories} /> : null}

      {(this.state.tabIndex === 2) ? <div>diagram</div> : null}
      {(this.state.tabIndex === 3) ? <div>filter</div> : null}
      </div> 
      
    )
  }
}

export default Stats; 