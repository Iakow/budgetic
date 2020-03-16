import React from 'react';
/* import { Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes'; 
import TransactionRow from './TransactionRow';
import TransactionForm from '../Form/TransactionForm';*/
import Table from './Table';
import Diagram from './Diagram';
import Filter from './Filter';


class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tabIndex: 1,
      filteredTransactions: this.props.statsTable
    }
  }

  filter = (arr)=> {
    this.setState({filteredTransactions: arr});
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
          transactions={this.state.filteredTransactions}
          tags={this.props.tags}
          categories={this.props.categories} /> : null}

        {(this.state.tabIndex === 2) ? <Diagram/> : null}
        
        {(this.state.tabIndex === 3) ? 
          <Filter 
            handler={this.filter} 
            /* хочется отдавать стейт для начальных велью, но пропс для фильтрации */
            arr={this.props.statsTable} /> : null}
      </div> 
    )
  }
}

export default Stats; 