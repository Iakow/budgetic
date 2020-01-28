import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

class AddPurchase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sum: '', 
      comment: '', 
      tag: '', 
      category: '', 
      submit: false,
      isItIncome: false
    };
  }


  toggleTransactionSign = (e)=> {
    e.preventDefault();

    this.setState((state)=>({
      isItIncome: !state.isItIncome,
      tag: '', 
      category: ''
    }))
  }


  handleInputChange = (e)=> {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  addTransaction = ()=> {
    this.props.db.collection('transactions').add({
      sum: this.state.isItIncome? +this.state.sum : -this.state.sum,
      date: Date.now(),
      comment: this.state.comment,
      category: this.state.category,
      tag: this.state.tag
    })
    .then((docRef)=> {
      console.log("Document written with ID: ", docRef.id);
      this.setState({submit: true});
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }


  handleSubmit = (e)=> {
    e.preventDefault();
    
    if (+this.state.sum) {
      this.addTransaction()
    } else {
      alert('Надо ввести сумму')
    }
  }


  render() {
    const transactionDirection = this.state.isItIncome? 'income' : 'spend';

    const tagsSelectOptions = this.props.tags[transactionDirection].map((tag, i) => (
      <option key = {i} value={tag}>
        {tag}
      </option> 
    ));

    const categoriesSelectOptions = this.props.categories[transactionDirection].map((category, i) => (
      <option key = {i} value={category}>
        {category}
      </option> 
    ));

    const signButtonText = this.state.isItIncome? "+" : "-";
    const message = this.state.isItIncome? "Доходы" : "Расходы";

    return (this.state.submit) ? <Redirect to="/" /> : (
      <div>
        <p>{message}</p>

        <form onSubmit={this.handleSubmit}>
          <button onClick={this.toggleTransactionSign}>
            {signButtonText}
          </button>

          <input 
            type="number" 
            placeholder="Сумма" 
            autoComplete="off" 
            name='sum' 
            value={this.state.sum}
            onChange={this.handleInputChange} 
            autoFocus 
          />

          <br/>

          <select name='category' value={this.state.category} onChange={this.handleInputChange}>
            <option value='' disabled>
              Категория
            </option>
            {categoriesSelectOptions}
          </select>
          
          <br/>
          
          <select name='tag' value={this.state.tag} onChange={this.handleInputChange}>
            <option value='' disabled>
              Теги
            </option>
            {tagsSelectOptions}
          </select>

          <br/>

          <textarea
            placeholder = 'Коммент:'
            name='comment' 
            value={this.state.comment} 
            onChange={this.handleInputChange} 
          />

          <br/>

          <input type="submit" value="Добавить" />
        </form>
    
        <Link to={ROUTES.MAIN}>
          {"<<<"}
        </Link>
      </div> 
    )
  }
}

export default AddPurchase;