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

  //const editTransactions = (e)=> {
    /* По клику должна рендериться форма из AddPurchase и в принципе все то же самое, что и при добавлении транзакции, только она должна не добавиться в коллекцию, а должен измениться соотв. документ. 
    
    Но для этого сперва надо в AddPurchase добавить возможность редактировать время.
    
    Ну и в мобильной версии это, наверное, должна быть не кнопка, а зажимание строки*/
  //}
  
  const statsTable = props.statsTable.map((doc, index) => (
    <tbody key = {index}>
      <tr>
        <td>{formatDate(doc.date)}</td>
        <td>{doc.sum}</td>
        <td>{doc.category}</td>
        <td>{doc.tag}</td>
        <td>{doc.comment}</td>
        <td>
          <button>edit</button>
        </td>
      </tr>
    </tbody> 
  ));

  return (
    <div>
      <h1> Статистика </h1>
      
      <Link to={ROUTES.MAIN}> {"<<<<<"} </Link>

      <table border="1">{statsTable}</table>
    </div>
  )
}

export default List; 