import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import Logout from './LogOut';

const Main = (props)=> {
  
  return (
    <div>
      <Logout/>
      <div>
        {props.sum}
      </div>
      
      <ul>
        <li><Link to={ROUTES.STATS}> Статистика </Link></li>
        <li><Link to={ROUTES.ADD}> Добавить покупку </Link></li>
      </ul>
    </div>
  )
}

export default Main;