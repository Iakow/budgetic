import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const Main = (props)=> {
/* Когда-то здесь будет отображаться красивый круглый виджет, которому будет нужна не только сумма */
  return (
    <div>
      <h2>
        {props.sum}
      </h2>
      
      <ul>
        <li><Link to={ROUTES.STATS}> Статистика </Link></li>
        <li><Link to={ROUTES.ADD}> Добавить покупку </Link></li>
        <li><Link to={ROUTES.SETTINGS}>Settings</Link></li>
      </ul>
    </div>
  )
}

export default Main;