import React from 'react';
import {Switch, Route} from "react-router-dom";
import * as firebase from 'firebase/app';
import "firebase/firestore";

import * as ROUTES from '../constants/routes';

import List from './List';
import AddPurchase from './AddPurchase';
import Main from './Main';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.db = null;
  }
  UNSAFE_componentWillMount() {

    var firebaseConfig = {
      apiKey: "AIzaSyDGOIDSMbZruufHctcPZqGdzVXnJwCJAg0",
      authDomain: "budgetic-fcb0e.firebaseapp.com",
      databaseURL: "https://budgetic-fcb0e.firebaseio.com",
      projectId: "budgetic-fcb0e",
      storageBucket: "budgetic-fcb0e.appspot.com",
      messagingSenderId: "808634940866",
      appId: "1:808634940866:web:623d627c6700ea69a6aa5b"
    };

    firebase.initializeApp(firebaseConfig);

    this.db = firebase.firestore();

/*     db.collection("users").add({
      first: "Ada",
      last: "Lovelace",
      born: 1815
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    }); */
  }


  render() {
    return (
      <div>
      <Switch>
        <Route path={ROUTES.ADD}>
          <AddPurchase db = {this.db}/>
        </Route>

        <Route path={ROUTES.STATS}>
          <List />
        </Route>

        <Route path={ROUTES.MAIN}>
          <Main />
        </Route>
      </Switch>
    </div>
    )
  }
}

export default App;