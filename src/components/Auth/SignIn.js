import React from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";
import { Redirect } from 'react-router-dom';


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email:'',
      password:'',
      signedIn: false,
      errorMessage: null
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    firebase.auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((res) => {
      console.log(res);
    })
    .catch((error)=> {
      console.log(error.message);
      console.log(error.code);

      this.setState({
        errorMessage: error.message,
        email:'',
        password:''
      })
    });
  }

  render() {
    return (this.state.signedIn) ? <Redirect to="/" /> : (
      <form onSubmit={this.handleSubmit}>
        <p>{this.state.errorMessage}</p>
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
            type='password'
          />

          <br/>
        </label>

        <input type="submit" value="Отправить" />
      </form>
    )
  }
}

export default SignIn;