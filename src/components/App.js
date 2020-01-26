import React from 'react';
import {Switch, Route} from "react-router-dom";
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

import * as ROUTES from '../constants/routes';
import List from './List';
import AddPurchase from './AddPurchase';
import Main from './Main';
import Auth from './Auth';
import Logout from './LogOut';
import Settings from './Settings'


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
      user: null,
      balance: null,
      transactions: [],
      tags: [],
      categories: []
    };
  }


  componentDidMount = ()=> {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.getUserData(user);
        this.setState({
          user: user
        })
      } else {
        this.setState({
          user: null
        })
      }
    })
  }


  getUserData = (user)=> {
    const userDB_ref = this.fireStore.collection("users").doc(user.email);
    const transactions_ref = userDB_ref.collection('transactions');
    const tags_ref = userDB_ref.collection('settings').doc('tags');
    const categories_ref = userDB_ref.collection('settings').doc('categories');

    transactions_ref.orderBy("date", "desc").onSnapshot((querySnapshot)=> {
      const transactionsArr = [];
      let balanceCounter = null;
      
      querySnapshot.forEach((doc)=> {
        transactionsArr.push(doc.data());
        balanceCounter += doc.data().sum;
      });

      this.setState({
        balance: balanceCounter,
        transactions: transactionsArr
      })
    });

    userDB_ref.collection('settings').onSnapshot(()=>{
      tags_ref.get().then((doc)=> {
        this.setState({
          tags: doc.data()
        })
      })
      .catch((error)=>{
        
      })

      categories_ref.get().then((doc)=> {
        this.setState({
          categories: doc.data()
        })
      })
      .catch((error)=>{

      })
    });

    /* userDB_ref.collection('settings').onSnapshot((querySnapshot)=>{
      querySnapshot.forEach((doc)=> {
        this.setState({
          [doc.id]: doc.data()
        });
      });
    }); */
  }


  render() {
    let noHaveTransactions = this.state.transactions.length === 0;
    let noHaveSettings = this.state.tags.length === 0 || this.state.categories.length === 0;

    if (noHaveSettings || noHaveTransactions) return <p>Download</p>

    if (this.state.user) {
      const userName = this.state.user.email;
      const userDBref = this.fireStore.collection("users").doc(userName);

      return (
        <div>
          <span><small>{userName}</small> </span>
          <Logout/>

          <Switch>
            <Route path={ROUTES.ADD}>
              <AddPurchase
                tags={this.state.tags}
                categories={this.state.categories}
                db={userDBref}
              />
            </Route>

            <Route path={ROUTES.SETTINGS}>
              <Settings
                tags={this.state.tags}
                categories={this.state.categories}
                db={userDBref}
              />
            </Route>
  
            <Route path={ROUTES.STATS}>
              <List statsTable={this.state.transactions}/>
            </Route>

            <Route path={ROUTES.MAIN} >
              <Main sum={this.state.balance}/>
            </Route>
          </Switch>
        </div>
      )
    } else {
      return <Auth db={this.fireStore}/>
    }
  }
}

export default App;