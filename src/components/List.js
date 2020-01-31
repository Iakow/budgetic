import React from 'react';
import { Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import TransactionRow from './TransactionRow';
import AddPurchase from './AddPurchase';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editDoc:false,
      doc: null
    }
  }

  done = ()=> {
    this.setState({
      editDoc:false,
      doc: null
    })
  }

  editDoc = (doc)=> {
    this.setState({
      doc: doc,
      editDoc: true
    })
  }
  
  render() {
    if (!this.state.doc) {
      return (
        <div>
          <h1> Статистика </h1>
          
          <Link to={ROUTES.MAIN}> {"<<<<<"} </Link>

          <table border="1">
            {this.props.statsTable.map((doc)=> 
              <TransactionRow editDoc={this.editDoc} key={doc.id} doc={doc} db={this.props.db}/>
            )}
          </table>
        </div>
      )
    } else {
      return <AddPurchase
        mode="edit"
        db={this.props.db}
        transaction={this.state.doc}
        tags={this.props.tags}
        categories={this.props.categories}
        done={this.done}
      />
    }
  }
}

export default List; 