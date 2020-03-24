import React from 'react';
import Table from './Table';
import Diagram from './Diagram';
import Filter from './Filter';


/* с новым пропсом массив надо бы отдать фильтру, чтобы тот вернул что надо. Как?
А что, если состояние фильтра тоже держать здесь???*/
class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1,
      dateInterval: [
        this.props.statsTable[this.props.statsTable.length - 1].date,
        this.props.statsTable[0].date
      ]
    }
  }

  getFilteredTransactions = () => {
    const firstDate = this.state.dateInterval[0];
    const roundedLastDate = new Date(this.state.dateInterval[1]).setHours('23', '59');

    return this.props.statsTable.filter((transaction)=>{
      return (firstDate <= transaction.date && transaction.date <= roundedLastDate);
    })
  }

  setDateInterval = (arr)=> {
    this.setState({dateInterval: arr})
  }

  render() {
    return (
      <div className='stats'>
        <ul className='tabs'>
          <li className='tab' onClick={()=>{this.setState({tabIndex: 1})}}>Table</li>
          <li className='tab' onClick={()=>{this.setState({tabIndex: 2})}}>Diagram</li>
          <li className='tab' onClick={()=>{this.setState({tabIndex: 3})}}>Filter</li>
        </ul>

        <div className='stats-content'>
          <Table
            className = {(this.state.tabIndex !== 1) ? 'hidden' : null}
            db={this.props.db}
            transactions={this.getFilteredTransactions()}
            tags={this.props.tags}
            categories={this.props.categories} /> 

          <Diagram
            className = {(this.state.tabIndex !== 2) ? 'hidden' : null} />
          
          <Filter
            className = {(this.state.tabIndex !== 3) ? 'hidden' : null}
            upData = {this.setDateInterval}
            dateInterval = {this.state.dateInterval} />
        </div>
      </div> 
    )
  }
}

export default Stats; 