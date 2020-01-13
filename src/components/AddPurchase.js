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
      submit: false
    };
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

    const form = (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
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
              <option value='placeholder' disabled>
                Категория:
              </option>

              {categories}
            </select>
            
            <br/>
            
            <select name='tag' value={this.state.tag} onChange={this.handleInputChange} >
              <option value='placeholder' disabled>
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

        <p>Кнопка +/- будет кроме знака суммы еще переключателем тегов и категорий</p>
        <p>Хранить ли в базе знак суммы??? Да! Надо ж складывать все для баланса</p>
        <p>Ок, а что делать с роутом для настроек?</p>
        <p>И с каких страниц нужен доступ к настройкам? В принципе пох, это несложно потом изнменить вроде</p>
      </div>
    );

    return (this.state.submit) ? <Redirect to="/" /> : form
  }
}

export default AddPurchase;