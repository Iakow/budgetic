import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

class AddPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sumValue: '', commentValue: '', submit: false};

    this.handleSumChange = this.handleSumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleSumChange(event) {
    this.setState({sumValue: event.target.value});
  }

  handleCommentChange(event) {
    this.setState({commentValue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.sumValue) {
      this.props.db.collection("users")
      .add({
        sum: this.state.sumValue,
        date: new Date(),
        comment: this.state.commentValue,
      })
      .then((docRef)=> {
          console.log("Document written with ID: ", docRef.id);
          console.log("Sum: ", this.state.sumValue);
          console.log("Comment: ", this.state.commentValue);
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
            <input type="text" value={this.state.sumValue} onChange={this.handleSumChange} />
            Коммент:
            <input type="text" value={this.state.commentValue} onChange={this.handleCommentChange} />
          </label>

          <input type="submit" value="Отправить" />
        </form>
    
        <Link to={ROUTES.MAIN}>
          На главную
        </Link>
      </div>
    );

    return (this.state.submit) ? <Redirect to="/" /> : form
  }
}

export default AddPurchase;