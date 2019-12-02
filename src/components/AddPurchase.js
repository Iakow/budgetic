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
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.sum) {
      this.props.db.collection("users")
      .add({
        sum: +this.state.sum,
        date: new Date(),
        comment: this.state.comment,
        category: this.state.category,
        tags: this.state.tag
      })
      .then(()=> {
          this.setState({submit: true});
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

    } else {
      alert('Надо хотя бы сумму ввести')
    }

  }

  render() {
    const form = (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Сумма:
            <input type="number" name='sum' value={this.state.sumValue} onChange={this.handleInputChange} autoFocus />
            <br/>

            Коммент:
            <input type="text" name='comment' value={this.state.commentValue} onChange={this.handleInputChange} />
            <br/>

            Категория:
            <input type="text" name='category' value={this.state.categoryValue} onChange={this.handleInputChange} />
            <br/>

            Теги:
            <input type="text" name='tag' value={this.state.tagValue} onChange={this.handleInputChange} />
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