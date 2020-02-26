import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const Main = (props)=> {
/* Когда-то здесь будет отображаться красивый круглый виджет, которому будет нужна не только сумма */
  return (
    <div className='main'>
      <p className='main-sum'>{props.sum}</p>
      <Link to={ROUTES.STATS}> <button className='main-stats'>Stats</button> </Link>
      <Link to={ROUTES.ADD}> <button className='main-plus'>+</button> </Link>
      <Link to={ROUTES.SETTINGS}> Settings </Link>
    </div>
  )
}

export default Main;