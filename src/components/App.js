import React from 'react';
import {Switch, Route} from "react-router-dom";

import * as ROUTES from '../constants/routes';

import List from './List';
import AddPurchase from './AddPurchase';
import Main from './Main'

const App = () => (
  <div>
    <Switch>
        <Route path={ROUTES.ADD}>
            <AddPurchase />
        </Route>

        <Route path={ROUTES.STATS}>
            <List />
        </Route>

        <Route path={ROUTES.MAIN}>
            <Main />
        </Route>
    </Switch>
  </div>
);

export default App;