import React from 'react';
import {Switch, Route} from "react-router-dom";
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

import * as ROUTES from '../constants/routes';

import List from './List';
import AddPurchase from './AddPurchase';
import Main from './Main';
import Login from './Login';

const firebaseConfig = {
  apiKey: "AIzaSyDGOIDSMbZruufHctcPZqGdzVXnJwCJAg0",
  authDomain: "budgetic-fcb0e.firebaseapp.com",
  databaseURL: "https://budgetic-fcb0e.firebaseio.com",
  projectId: "budgetic-fcb0e",
  storageBucket: "budgetic-fcb0e.appspot.com",
  messagingSenderId: "808634940866",
  appId: "1:808634940866:web:623d627c6700ea69a6aa5b"
};

class App extends React.Component {
  constructor(props) {
    super(props); 

    this.db = null;

    this.state = {
      sum: 0, 
      collection: [], 
      user: null, 
      authResponse: false
    };

    this.getPreSum = this.getPreSum.bind(this);
    this.getPreStatistisc = this.getPreStatistisc.bind(this);
  }

  UNSAFE_componentWillMount() {
    firebase.initializeApp(firebaseConfig);

    this.db = firebase.firestore();
  }

  componentDidMount = ()=> {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log(user.email);
        this.setState({user: user, authResponse: true})
      } else {
        this.setState({authResponse: true})
        console.log('user нема!!!')
      }
    });
  }

  getPreSum(newSum) {
    this.setState({sum: newSum});
  }

  getPreStatistisc(newCollection) {
    this.setState({collection: newCollection});
  }

  render() {
    let email;

    if (this.state.user) email = this.state.user.email;

    return (this.state.user) ? 
    (
      <div>
        <h6>{email}</h6>

        <Switch>
          <Route path={ROUTES.ADD}>
            <AddPurchase db = {this.db} />
          </Route>

          <Route path={ROUTES.STATS}>
            <List db = {this.db} preCollection = {this.state.collection} sendPreCollection = {this.getPreStatistisc}/>
          </Route>

          <Route path={ROUTES.MAIN}>
            <Main db = {this.db} sum = {this.state.sum} upSum = {this.getPreSum}/>
          </Route>
        </Switch>
      </div>
    ) : <Login />
  }
}
/* Как правильно перенаправить на логин */
export default App;