import React from 'react';
import { Link, Redirect } from 'react-router-dom';
//import * as firebase from 'firebase/app';

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

  changeSign = (e)=> {
    e.preventDefault();

    this.setState((state)=>({
      isItIncome: !state.isItIncome
    }))
  }

  handleInputChange = (e)=> {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e)=> {
    e.preventDefault();
    if (+this.state.sum) {
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

    } else {
      alert('Надо ввести сумму')
    }

  }

  render() {
    const sign = this.state.isItIncome? 'income' : 'spend';

    const tags = this.props.tags[sign].map((value, index) => (
      <option key = {index} value={value}>
        {value}
      </option> 
    ));

    const categories = this.props.categories[sign].map((value, index) => (
      <option key = {index} value={value}>
        {value}
      </option> 
    ));

    const buttonsSign = this.state.isItIncome? "+" : "-";
    const message = this.state.isItIncome? "Доходы" : "Расходы";

    const form = (
      <div>
        <p>{message}</p>
        <form onSubmit={this.handleSubmit}>
            <button onClick={this.changeSign}>{buttonsSign}</button>
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

            <select name='category' value={this.state.category} onChange={this.handleInputChange} >
              <option value='' disabled>
                Категория
              </option>

              {categories}
            </select>
            
            <br/>
            
            <select name='tag' value={this.state.tag} onChange={this.handleInputChange} >
              <option value='' disabled>
                Теги
              </option>
              {tags}
            </select>
            <br/>
            <textarea
              placeholder = 'Коммент:'
              name='comment' 
              value={this.state.comment} 
              onChange={this.handleInputChange} 
            />

            <br/>

          <input type="submit" value="Отправить" />
        </form>
    
        <Link to={ROUTES.MAIN}>
          {"<<<"}
        </Link>
      </div>
    );

    return (this.state.submit) ? <Redirect to="/" /> : form
  }
}

export default AddPurchase;