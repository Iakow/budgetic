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
    this.state = {sum: 0};

    this.preloadingState = this.preloadingState.bind(this);
  }

  UNSAFE_componentWillMount() {
    const firebaseConfig = {
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
  }

  preloadingState(newSum) {
    this.setState({sum: newSum});
  }


  render() {
    return (
      <div>
        <Switch>
          <Route path={ROUTES.ADD}>
            <AddPurchase db = {this.db} newSum = {this.preloadingState}/>
          </Route>

          <Route path={ROUTES.STATS}>
            <List />
          </Route>

          <Route path={ROUTES.MAIN}>
            <Main db = {this.db} sum = {this.state.sum} newSum = {this.preloadingState}/>
          </Route>
        </Switch>
      </div>
    )
  }
}

export default App;