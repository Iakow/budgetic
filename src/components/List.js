import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const List = (props)=> {
  const formatDate = (date)=> {
    const d = new Date(date);
    const formatedStr = `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}
                         ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    return formatedStr;
  }
  
  const statsTable = props.statsTable.map((doc, index) => (
    <tbody key = {index}>
      <tr>
        <td>{formatDate(doc.date)}</td>
        <td>{doc.sum}</td>
        <td>{doc.category}</td>
        <td>{doc.tag}</td>
        <td>{doc.comment}</td>
      </tr>
    </tbody> 
  ));

  return (
    <div>
      <table border="1">{statsTable}</table>

      <h1> Статистика </h1>
      
      <Link to={ROUTES.MAIN}> {"<<<<<"} </Link>
    </div>
  )
}

export default List; 