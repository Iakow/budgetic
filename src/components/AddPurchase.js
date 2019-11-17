import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

class AddPurchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', submit: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.value) {
      this.props.db.collection("users")
      .add({
        first: this.state.value
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });

      this.setState({submit: true})
    } else {
      alert('Поле пустое')
    }

    
  }

  render() {
    if (this.state.submit) {
      return <Redirect to="/" />
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Сумма:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>

            <input type="submit" value="Отправить" />
          </form>
      
          <Link to={ROUTES.MAIN}>
            На главную
          </Link>
        </div>
      );
    }
  }
}

export default AddPurchase;