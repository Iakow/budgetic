import React from 'react';
import TransactionRow from './TransactionRow';

const Table = (props)=> {
  return (
    <table>
      <tbody>
        {props.transactions.map((doc)=> 
          <TransactionRow
            editDoc={props.editDoc}
            key={doc.id}
            doc={doc}
            db={props.db} />
        )}
      </tbody>
    </table>
  )
}

export default Table;