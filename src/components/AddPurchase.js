/* 

Кнопка будет менять состояние и надо как-то подгружать соотв-е категории и теги.
Сперва надо подготовить место и добавить дефолтные теги и категории - это в Логине.

Как подгружать разные массивы в селекты?


*/

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as firebase from 'firebase/app';

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
      this.props.db.update({
        transactions: firebase.firestore.FieldValue.arrayUnion({
          sum: +this.state.sum,
          date: Date.now(),
          comment: this.state.comment,
          category: this.state.category,
          tag: this.state.tag
        })
      })
      .then(()=> {
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
    const tags = this.props.tags.map((value, index) => (
      <option key = {index} value={value}>
        {value}
      </option> 
    ));

    const categories = this.props.categories.map((value, index) => (
      <option key = {index} value={value}>
        {value}
      </option> 
    ));

    const sign = this.state.isItIncome? "+" : "-";

    const form = (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <button onClick={this.changeSign}>{sign}</button>
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
                Категория:
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
          </label>

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