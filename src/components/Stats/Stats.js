import React from 'react';
/* import { Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes'; 
import TransactionRow from './TransactionRow';*/
import TransactionForm from '../Form/TransactionForm';
import Table from './Table';

class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode:false,
      editableTransaction: null
    }
  }

  editTransaction = (doc)=> {
    const id = this.state.editableTransaction.id;
    const TRANSACTION_REF = this.props.db.collection('transactions').doc(id);

    TRANSACTION_REF.set(doc)
    .then(()=> {
      console.log("Document is updated");
      this.setState({editMode:false})
    })
    .catch((error)=> {
        console.error("Error editing document: ", error);
    });
  }

  cancelEditing = ()=> {
    this.setState({editMode:false})
  }

  startEditing = (doc)=> {
    this.setState({
      editableTransaction: doc,
      editMode: true
    })
  }
  
  render() {
    if (!this.state.editMode) {
      return (
        <Table
          editDoc={this.startEditing}
          db={this.props.db}
          transactions={this.props.statsTable} />
      )
    } else {
      return (
        <TransactionForm
          mode="edit"
          transaction={this.state.editableTransaction}
          tags={this.props.tags}
          categories={this.props.categories}
          handler={this.editTransaction}
          cancel={this.cancelEditing} />
      )
    }
  }
}

export default Stats; 