import React from 'react';
import TransactionRow from './TransactionRow';
import TransactionForm from '../Form/TransactionForm';

/* Надо сюда всю логику из Stats переносить 
   А кроме того тут нужен стейт для сортировки или же сортировать уровнем выше*/

class Table extends React.Component { /* editDoc, db, transactions*/
  constructor(props) {
    super(props);

    this.state = {
      editMode:false,
      editableTransaction: null,
      sortedTransactions: this.props.transactions,
      sortedByDateReverse: true,
      sortedBySum: false,
      sortedBySumModule: false
    }
  }

  sortByDate = ()=> {
    const array = this.props.transactions.sort((a, b)=> {
      return (this.state.sortedByDateReverse) ? (a.date - b.date) : (b.date - a.date)});
    
    this.setState({
      sortedTransactions: array,
      sortedByDateReverse: !this.state.sortedByDateReverse
    })
  }

  sortBySum = ()=> {
    const array = this.props.transactions.sort((a, b)=> {
      return (this.state.sortedBySum) ? (a.sum - b.sum) : (b.sum - a.sum)});
    
    this.setState({
      sortedTransactions: array,
      sortedBySum: !this.state.sortedBySum
    })
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
        <table>
          <thead>
            <tr className="table-header">
              <th className='clickable' onClick={this.sortByDate}>Дата</th>
              <th className='clickable' onClick={this.sortBySum}>Сумма</th>
              <th>Категория</th>
              <th>Теги</th>
              <th>Коммент</th>
              <th>&#128293;</th>
            </tr>
          </thead>

          <tbody>
            {this.state.sortedTransactions.map((doc)=> // сюда надо просто подсовывать сортированный массив
              <TransactionRow 
                editDoc={this.startEditing}
                key={doc.id}
                doc={doc}
                db={this.props.db} />
            )}
          </tbody>
        </table>
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

export default Table;