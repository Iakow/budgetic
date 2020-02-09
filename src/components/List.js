import React from 'react';
import { Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import TransactionRow from './TransactionRow';
import TransactionForm from './TransactionForm';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editDoc:false,
      doc: null
    }
  }

  editTransaction = (doc)=> {
    const id = this.state.doc.id;
    const TRANSACTION = this.props.db.collection('transactions').doc(id);

    TRANSACTION.set(doc)
    .then(()=> {
      console.log("Document is updated");
      this.setState({editDoc:false})
    })
    .catch((error)=> {
        console.error("Error editing document: ", error);
    });
  }

  cancelEditing = ()=> {
    this.setState({editDoc:false})
  }

  editDoc = (doc)=> {
    this.setState({
      doc: doc,
      editDoc: true
    })
  }
  
  render() {
    if (!this.state.editDoc) {
      return (
        <div>
          <h1> Статистика </h1>
          
          <Link to={ROUTES.MAIN}> {"<<<<<"} </Link>

          <table border="1">
            {this.props.statsTable.map((doc)=> 
              <TransactionRow
                editDoc={this.editDoc}
                key={doc.id}
                doc={doc}
                db={this.props.db}
              />
            )}
          </table>
        </div>
      )
    } else {
      return <TransactionForm
        mode="edit"
        transaction={this.state.doc}
        tags={this.props.tags}
        categories={this.props.categories}
        handler={this.editTransaction}
        cancel={this.cancelEditing}
      />
    }
  }
}

export default List; 