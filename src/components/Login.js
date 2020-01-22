import React from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import { Redirect } from 'react-router-dom';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email:'',
      password:'',
      logedIn: false,
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
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res);
        
        const newUserDBRef = this.props.db.collection("users").doc(this.state.email);//так может тут надо полагаться не на стейт, а на ответ от сервера?

        const initialSettings = (db)=> {
          let batch = this.props.db.batch();

          /////////////////////
          batch.set(db, {
            d: 'd'
          })
          ///////////////////
        
          let categoriesRef = db.collection('settings').doc('categories');
          batch.set(categoriesRef, {
            income:['catIncome1', 'catIncome2'],
            spend: ['catSpend1', 'catSpend2']
          });
        
          let tagsRef = db.collection('settings').doc('tags');
          batch.set(tagsRef, {
            income:['tagIncome1', 'tagIncome2'],
            spend: ['tagSpend1', 'tagSpend2']
          });
        
          batch.commit().then(function () {
            console.log('стартовые теги и категории добавлены, коллекция для Транзакции появится при добавлении первой транзакции')
          });
        }

        initialSettings (newUserDBRef);
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
    return (this.state.logedIn) ? <Redirect to="/" /> : (
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

export default Login;