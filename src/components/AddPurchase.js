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
      submit: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (+this.state.sum) {
      this.props.db.collection("transactions")
      .add({
        sum: +this.state.sum,
        date: Date.now(),
        comment: this.state.comment,
        category: this.state.category,
        tag: this.state.tag
      })
      .then(()=> { 
        /* тут я просто перехожу на главный роут и Арр рендерит Мейн */
        this.props.refreshFirestore();
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

              <option value='Первая'>
                Первая
              </option>

              <option value='Вторая'>
                Вторая
              </option>
            </select>
            
            <br/>
            
            <select name='tag' value={this.state.tag} onChange={this.handleInputChange} >
              <option value='placeholder' disabled>
                Теги
              </option>

              <option value='первый тег'>
                первый тег
              </option>

              <option value='второй тег'>
                второй тег
              </option>

              
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