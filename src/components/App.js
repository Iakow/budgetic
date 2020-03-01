import React from 'react';
import {Switch, Route} from "react-router-dom";
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

import * as ROUTES from '../constants/routes';

import Stats from './Stats/Stats';
import AddPurchase from './AddPurchase';
import Main from './Main';
import Auth from './Auth/Auth';
/* import Logout from './LogOut'; */
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
      categories: [],
      needLogin: false
    };
  }


  componentDidMount = ()=> {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.getAndListenUserData(user);
        this.setState({
          user: user,
          needLogin: false
        })
      } else {
        this.setState({
          user: null,
          needLogin:true
        })
      }
    })
  }


  getAndListenUserData = (user)=> {
    const USER_DB = this.fireStore.collection("users").doc(user.email);
    const TRANSACTIONS = USER_DB.collection('transactions');
    const TAGS_OPTIONS = USER_DB.collection('settings').doc('tags');
    const CATEGORIES_OPTIONS = USER_DB.collection('settings').doc('categories');

    TRANSACTIONS.orderBy("date", "desc").onSnapshot((querySnapshot)=> {
      const transactionsArr = [];
      let balanceCounter = null;
      
      querySnapshot.forEach((doc)=> {
        const transaction = doc.data();
        transaction.id = doc.id;
        
        transactionsArr.push(transaction);
        balanceCounter += transaction.sum;
      });

      this.setState({
        balance: balanceCounter,
        transactions: transactionsArr
      })
    });

    USER_DB.collection('settings').onSnapshot(()=>{
      TAGS_OPTIONS.get().then((doc)=> {
        this.setState({
          tags: doc.data()
        })
      })
      .catch((error)=>{
        console.log(error.message)
      })

      CATEGORIES_OPTIONS.get().then((doc)=> {
        this.setState({
          categories: doc.data()
        })
      })
      .catch((error)=>{
        console.log(error.message)
      })
    });
  }


  render() {
    // при таком подходе, кажется, при регистрации все зависнет с пустыми transactions
    // надо опираться на ответ при чтении, наверное

    // и вынести все условия в один стейт, чтобы разгрузить render
    
    const noHaveTransactions = this.state.transactions.length === 0;
    const noHaveSettings = this.state.tags.length === 0 || this.state.categories.length === 0;
    const needLogin = this.state.needLogin;

    if (!needLogin && (noHaveSettings || noHaveTransactions)) return <div className="async-spinner"></div>

    if (this.state.user) {
      const userName = this.state.user.email;
      const USER_DB = this.fireStore.collection("users").doc(userName);

      return (
        <div className='appContainer'>
          {/* <span><small>{userName}</small></span>
          <Logout/> */}

          <Switch>
            <Route path={ROUTES.ADD}>
              <AddPurchase
                tags={this.state.tags}
                categories={this.state.categories}
                db={USER_DB} />
            </Route>

            <Route path={ROUTES.SETTINGS}>
              <Settings
                tags={this.state.tags}
                categories={this.state.categories}
                db={USER_DB} />
            </Route>
  
            <Route path={ROUTES.STATS}>
              <Stats
                statsTable={this.state.transactions}
                tags={this.state.tags}
                categories={this.state.categories}
                db={USER_DB} />
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