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
        this.getUserData(user);
      } else {
        this.setState({
          user: null,
          firstDownload: false
        })
      }
    })
  }

  getUserData = (user)=> {
    const userDB_ref = this.fireStore.collection("users").doc(user.email);

    userDB_ref.onSnapshot((doc)=>{ // подписка на изменения в доке
      userDB_ref.collection("transactions").get().then((querySnapshot)=> {  //запрашииваю все доки из транзакшн
        let transactionsArr = [];
        let SUM = null;
        
        querySnapshot.forEach((doc)=> { //строю массив для таблицы, считаю сумму
            transactionsArr.push(doc.data());
            SUM += doc.data().sum;
        });

        this.setState({  //таблицу и массив в стейт
          balance: SUM,
          statsTable: transactionsArr
        })
      });

      userDB_ref.collection('settings').doc('tags').get().then((doc)=>{
        this.setState({
          tags: doc.data()
        })
      });

      userDB_ref.collection('settings').doc('categories').get().then((doc)=>{
        this.setState({
          categories: doc.data()
        })
      });

      this.setState({
        user: user,
        firstDownload: false
      })
    })
  }


  render() {
    if (this.state.firstDownload) return <p>Download</p>

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
              <List statsTable={this.state.statsTable}/>
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