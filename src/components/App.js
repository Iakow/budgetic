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

    firebase.initializeApp(firebaseConfig);
    this.fireStore = firebase.firestore();

    this.state = {
      balance: null,
      statsTable: [], 
      user: null,
      firstDownload: true
    };
  }


  componentDidMount = ()=> {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        const userDB = this.fireStore.collection("users").doc(user.email);

        userDB.onSnapshot((doc)=>{
          const transactions = doc.data().transactions;
          let SUM = null;

          transactions.forEach((transaction)=> {
            SUM += transaction.sum;
          })

          this.setState({
            balance: SUM,
            statsTable: transactions,
            user: user,
            firstDownload: false
          })
        })
      } else {
        this.setState({
          user: null,
          firstDownload: false
        })
      }
    })
  }


  render() {
    if (this.state.firstDownload) return <p>Download</p>
    if (this.state.user) {
      const userName = this.state.user.email;
      const userDB = this.fireStore.collection("users").doc(userName);

      return (
        <div>
          <h6>{userName}</h6>
          <Switch>
            <Route path={ROUTES.ADD}>
              <AddPurchase db={userDB}/>
            </Route>
  
            <Route path={ROUTES.STATS}>
              <List statsTable={this.state.statsTable}/>
            </Route>

            <Route
              path={ROUTES.MAIN} 
              render={()=> <Main sum={this.state.balance}/>}
            />
          </Switch>
        </div>
      )
    } else {
      return <Login db={this.fireStore}/>
    }
  }
}

export default App;