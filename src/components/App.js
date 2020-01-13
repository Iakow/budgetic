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


const firebaseConfig = {
  apiKey: "AIzaSyDGOIDSMbZruufHctcPZqGdzVXnJwCJAg0",
  authDomain: "budgetic-fcb0e.firebaseapp.com",
  databaseURL: "https://budgetic-fcb0e.firebaseio.com",
  projectId: "budgetic-fcb0e",
  storageBucket: "budgetic-fcb0e.appspot.com",
  messagingSenderId: "808634940866",
  appId: "1:808634940866:web:623d627c6700ea69a6aa5b"
};

/* Дело в том, что мне бы надо передавать в AddPurchase уже подготовленные списки тегов и категорий. Ну и лучше бы их подготовить один раз, а не лазить каждый раз при маунте.
Т.е. надо хранить в стейте выше*/

class App extends React.Component {
  constructor(props) {
    super(props);

    firebase.initializeApp(firebaseConfig);
    this.fireStore = firebase.firestore();

    this.state = {
      balance: null,
      statsTable: [], 
      user: null,
      firstDownload: true,
      tags: [],
      categories: []
    };
  }


  componentDidMount = ()=> {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        const userDB_ref = this.fireStore.collection("users").doc(user.email);

        userDB_ref.onSnapshot((doc)=>{
          const transactions = doc.data().transactions;
          const tags = doc.data().tags;
          const categories = doc.data().categories;
          let SUM = null;

          transactions.forEach((transaction)=> {
            SUM += transaction.sum;
          })

          this.setState({
            balance: SUM,
            statsTable: transactions,
            user: user,
            firstDownload: false,
            tags: tags,
            categories: categories
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
          <span><small>{userName}</small> </span>
          <Logout/>
          <Switch>
            <Route path={ROUTES.ADD}>
              <AddPurchase
                tags={this.state.tags}
                categories={this.state.categories}
                db={userDB}/>
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
      return <Auth db={this.fireStore}/>
    }
  }
}

export default App;