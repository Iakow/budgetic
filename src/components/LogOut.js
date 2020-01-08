/* кнопка, по нажатию которой произойдет логаут */

import React from 'react';
//import { useHistory } from 'react-router-dom';
import * as firebase from 'firebase/app';
import "firebase/auth";

const Logout = ()=> {
  const onClick = ()=> {
    firebase.auth().signOut();
  }

  return <button onClick={onClick}>Logout</button>
}

export default Logout;