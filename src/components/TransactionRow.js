import React from 'react';

const TransactionRow = (props)=> {

  const formatDate = (date)=> {
    const d = new Date(date);
    const formatedStr = `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}
                         ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    return formatedStr;
  }

  const submitChanges = ()=> {
    props.editDoc(props.doc)
  }

  return (
    <tbody> 
    <tr>
      <td>{formatDate(props.doc.date)}</td>
      <td>{props.doc.sum}</td>
      <td>{props.doc.category}</td>
      <td>{props.doc.tag}</td>
      <td>{props.doc.comment}</td>
      <td>
        <button 
          id = {props.doc.id}
          onClick = {submitChanges}
        >
          edit
        </button>
      </td>
    </tr>
  </tbody>
  )
}

export default TransactionRow;