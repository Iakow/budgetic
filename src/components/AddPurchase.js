import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

class AddPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sumValue: '', commentValue: '', tagValue: '', categoryValue: '', submit: false};

    this.handleSumChange = this.handleSumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleSumChange(event) {
    this.setState({sumValue: event.target.value});
  }

  handleCommentChange(event) {
    this.setState({commentValue: event.target.value});
  }

  handleTagChange(event) {
    this.setState({tagValue: event.target.value});
  }

  handleCategoryChange(event) {
    this.setState({categoryValue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.sumValue) {
      this.props.db.collection("users")
      .add({
        sum: this.state.sumValue,
        date: new Date(),
        comment: this.state.commentValue,
        category: this.state.categoryValue,
        tags: this.state.tagValue
      })
      .then(()=> {
          this.setState({submit: true})
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
            <input type="text" value={this.state.sumValue} onChange={this.handleSumChange} autoFocus />
            <br/>

            Коммент:
            <input type="text" value={this.state.commentValue} onChange={this.handleCommentChange} />
            <br/>

            Категория:
            <input type="text" value={this.state.categoryValue} onChange={this.handleCategoryChange} />
            <br/>

            Теги:
            <input type="text" value={this.state.tagtValue} onChange={this.handleTagChange} />
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