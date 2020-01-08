import React from 'react';
import "firebase/auth";
import LogIn from './Login';
import SignIn from './SignIn';


class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signin: true
    }
      
  }

  handleInputChange = (e) => {
    this.setState({
      signin: e.target.value === 'SignIn'
    });
  }

  render() {
    let form;
    if(this.state.signin) {
      form = <SignIn />
    } else {
      form = <LogIn db = {this.props.db}/>
    }
    return (
      <div>
      <form>
        <label>
          <input type='radio' name='SignIn' value='SignIn' checked={this.state.signin} onChange={this.handleInputChange}/>SignIn
          <input type='radio' name='LogIn' value='LogIn' checked={!this.state.signin} onChange={this.handleInputChange}/> LogIn
        </label>
        
      </form>
      {form}
      </div>
    )
  }
}

export default Auth;