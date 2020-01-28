import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import TransactionRow from './TransactionRow';

const List = (props)=> {
  return (
    <div>
      <h1> Статистика </h1>
      
      <Link to={ROUTES.MAIN}> {"<<<<<"} </Link>

      <table border="1">
        {props.statsTable.map((doc) => 
          <TransactionRow key = {doc.id} doc = {doc}/>
        )}
      </table>
    </div>
  )
}

export default List; 