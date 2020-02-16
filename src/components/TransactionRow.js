import React from 'react';

const TransactionRow = (props)=> {

  const formatDate = (date)=> {
    const d = new Date(date);

    const DD = (d.getDate()>9) ? d.getDate() : `0${d.getDate()}`;
    const MM = ((d.getMonth()+1)>9) ? d.getMonth()+1 : `0${d.getMonth()+1}`;
    const YYYY = d.getFullYear();

    const HH = ((d.getHours()>9)) ? d.getHours() : `0${d.getHours()}`;
    const MI = ((d.getMinutes()>9)) ? d.getMinutes() : `0${d.getMinutes()}`;
    const SEC = ((d.getSeconds()>9)) ? d.getSeconds() : `0${d.getSeconds()}`;


    return `${DD}.${MM}.${YYYY} ${HH}:${MI}:${SEC}`
  }

  const submitChanges = ()=> {
    props.editDoc(props.doc)
  }

  const delTransaction = ()=> {
    props.db.collection("transactions").doc(props.doc.id).delete()
    .then(()=> {
        console.log("Document successfully deleted!");
      })
    .catch((error)=> {
      console.error("Error removing document: ", error);
    });
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
        <button id = {props.doc.id} onClick = {submitChanges}>
          {'edit'}
        </button>

        <button onClick = {delTransaction}>
          {'del'}
        </button>
      </td>
    </tr>
  </tbody>
  )
}

export default TransactionRow;