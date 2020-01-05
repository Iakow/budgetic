import React from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";
import { Redirect } from 'react-router-dom';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email:'',
      password:'',
      logedIn: false,
      userBaseIsCreated: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const userDB = this.props.db.collection("users").doc(this.state.email);
    
    /*Выходит, я содаю док для юзера даже если регистрация не прошла???*/

    userDB.set({
      categories: ['first_cat', 'second_cat'],
      tags: ['frist_tag', 'second_tag']
    })
      .then(()=> {
          this.setState({userBaseIsCreated: true});
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
    });

    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        console.log('Успех:' + res);
        this.setState({logedIn: true})
      })
      .catch(function(error) {
        console.log(error.message);
        console.log(error.code);
    });
  }

  render() {
    return (this.state.logedIn) ? <Redirect to="/" /> : (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            placeholder="Email" 
            name='email' 
            value={this.state.email} 
            onChange={this.handleInputChange} 
            autoFocus 
          />

          <br/>

          <input
            placeholder="Password"
            name='password'
            value={this.state.password}
            onChange={this.handleInputChange}
          />

          <br/>
        </label>

        <input type="submit" value="Отправить" />
      </form>
    )
  }
}

export default Login;