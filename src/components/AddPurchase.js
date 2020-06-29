import React from 'react';
import { Redirect } from 'react-router-dom';
import TransactionForm from './Form/TransactionForm';


class AddPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { submit: false }
  }


  addTransaction = (doc) => {
    const TRANSACTIONS = this.props.db.collection('transactions');

    TRANSACTIONS.add(doc)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.setState({ submit: true });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }


  cancel = () => {
    this.setState({ submit: true })
  }


  render() {
    return (this.state.submit) ? <Redirect to={'/'} /> : (
      <TransactionForm
        tags={this.props.tags}
        categories={this.props.categories}
        handler={this.addTransaction} // вот здесь утечка вроде бы
        cancel={this.cancel}
      />
    )
  }
}

export default AddPurchase;