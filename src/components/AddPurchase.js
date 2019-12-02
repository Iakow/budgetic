import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

class AddPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sum: '', comment: '', tag: '', category: '', submit: false};

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
      this.props.db.collection("users")
      .add({
        sum: +this.state.sum,
        date: Date.now(),
        comment: this.state.comment,
        category: this.state.category,
        tag: this.state.tag
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
    const form = (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Сумма:
            <input type="text" name='sum' value={this.state.sum} onChange={this.handleInputChange} autoFocus />
            <br/>

            Коммент: {/* значение не обязательно */}
            <input type="text" name='comment' value={this.state.comment} onChange={this.handleInputChange} />
            <br/>

            Категория:
            <input type="text" name='category' value={this.state.category} onChange={this.handleInputChange} />
            <br/>

            Теги: {/* тоже не обязательно */}
            <input type="text" name='tag' value={this.state.tag} onChange={this.handleInputChange} />
          </label>

          <input type="submit" value="Отправить" />
        </form>
    
        <Link to={ROUTES.MAIN}>
          {"<- На главную"}
        </Link>
      </div>
    );

    return (this.state.submit) ? <Redirect to="/" /> : form
  }
}

export default AddPurchase;