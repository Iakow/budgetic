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

/* А что, если я всем потомкам просто раздам метод, который будет обновлять образ базы?
   Тогда не надо будет поднимать отдельно таблицу и сумму.
    */

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appStore: null,
      balance: 0, 
      statsTable: [], 
      user: null
    };
  }

  componentDidMount = ()=> {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.setState({
          user: user,
          appStore: firebase.firestore()
        })
      } else {
        console.log('нет авторизации')
      }
    });
  }

  saveBalaceValue = (newSum)=> {
    this.setState({balance: newSum});
  }

  saveStatsState = (newTable)=> {
    this.setState({statsTable: newTable});
  }

  refreshFirestore = (newState)=> {
    this.setState({statsTable: newState});
  }

  render() {
    if (this.state.user) {
      const userName = this.state.user.email;
      const userDB = this.state.appStore.collection("users").doc(userName);

      return (
        <div>
          <h6>{userName}</h6>
          
          <Switch>
            <Route path={ROUTES.ADD}>
              <AddPurchase db={userDB} refreshFirestore = {this.srefreshFirestore}/>
            </Route>
  
            <Route path={ROUTES.STATS}>
              <List db={userDB} preCollection={this.state.statsTable} sendPreCollection={this.saveStatsState}/>
            </Route>
  
            <Route path={ROUTES.MAIN}>
              <Main db={userDB} sum={this.state.balance} upSum={this.saveBalaceValue}/>
            </Route>
          </Switch>
        </div>
      )
    } else {
      return <Login db={this.state.appStore}/>
    }
  }
}

export default App;