import React from 'react';
import "firebase/auth";
import LogIn from './Login';
import SignIn from './SignIn';


class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signin: true // у меня уже есть аккаунт
    }
  }

  handleInputChange = (e) => {
    this.setState({
      signin: e.target.value === 'SignIn'
    });
  }

  render() {

    const loginForm = (this.state.signin) ? <SignIn /> : <LogIn db = {this.props.db}/>

    return (
      <div>
        <form>
          <label>
            <input
              type='radio'
              name='SignIn'
              value='SignIn'
              checked={this.state.signin}
              onChange={this.handleInputChange}
            /> SignIn

            <input
              type='radio'
              name='LogIn'
              value='LogIn'
              checked={!this.state.signin}
              onChange={this.handleInputChange}
            /> LogIn
          </label>
        </form>
        
        {loginForm}
      </div>
    )
  }
}

export default Auth;