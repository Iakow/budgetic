import React from 'react';
import { Link, Redirect } from 'react-router-dom';

//import * as ROUTES from '../constants/routes';
import Select from './Select';
import DateInput from "./DateInput";

class AddPurchase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: Date.now(),
      sum: '', // почему строка?
      comment: '', 
      tag: '', 
      category: '', 
      submit: false, // при редактировании и добавлении работает по-разному
      isItIncome: false
    };
  }

  componentDidMount = ()=> {
    if (this.props.mode === 'edit') {
      const transaction = this.props.transaction;
      
      this.setState({
        date: transaction.date,
        sum: Math.abs(transaction.sum), // поменять
        comment: transaction.comment, 
        tag: transaction.tag, 
        category: transaction.category,
        isItIncome: (transaction.sum>0) ? true : false
      })
    }
  }


  htmlStirngToTimestamp = (htmlDate)=> {
    const YYYY = +htmlDate.slice(0, 4);
    const MM = +htmlDate.slice(6,7) - 1;
    const DD = +htmlDate.slice(8,10);
    const HH = +htmlDate.slice(11,13);
    const MI = +htmlDate.slice(14);

    const date = new Date();

    date.setFullYear(YYYY, MM, DD);
    date.setHours(HH, MI);

    return date.getTime();
  }


  toggleTransactionSign = (e)=> {
    e.preventDefault();

    this.setState((state)=>({
      isItIncome: !state.isItIncome,
      tag: '', 
      category: ''
    }))
  }


  handleInputChange = (e)=> {
    if(e.target.type === 'datetime-local') {
      this.setState({
        [e.target.name]: this.htmlStirngToTimestamp(e.target.value)
      });
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  }

/* А не лучше ли менять знак state.sum сразу напрямую, а в инпуте отображать просто модуль???
   По идее тогда мне не нужен isItIncome и это круто!
   И не выйдет ли тогда заполнить все поля дока одной деструктуризацией или как там оно??? */

  addTransaction = ()=> {
    this.props.db.collection('transactions').add({
      sum: this.state.isItIncome? +this.state.sum : -this.state.sum,
      date: this.state.date,
      comment: this.state.comment,
      category: this.state.category,
      tag: this.state.tag
    })
    .then((docRef)=> {
      console.log("Document written with ID: ", docRef.id);
      this.setState({submit: true});
    })
    .catch((error)=> {
      console.error("Error adding document: ", error);
    });
  }

  editTransaction = ()=> {
    const transaction = this.props.transaction;

    this.props.db.collection('transactions').doc(transaction.id).set({
      sum: this.state.isItIncome? +this.state.sum : -this.state.sum,
      date: this.state.date,
      comment: this.state.comment,
      category: this.state.category,
      tag: this.state.tag
    })
    .then(()=> {
      console.log("Document is updated");
      this.props.done()
    })
    .catch((error)=> {
        console.error("Error editing document: ", error);
    });
  }


  handleSubmit = (e)=> {
    e.preventDefault();
    
    if (+this.state.sum) {
      (this.props.mode === 'edit') ? this.editTransaction() : this.addTransaction()
    } else {
      alert('Надо ввести сумму')
    }
  }

  render() {
    const sign = this.state.isItIncome === true;
    const parentPath = (this.props.mode === 'edit') ? '/stats' : '/';

    return (this.state.submit) ? <Redirect to={parentPath} /> : (
      <div>
        <p>{(this.state.isItIncome)? "Доходы" : "Расходы"}</p>

        <form onSubmit={this.handleSubmit}>
          <DateInput
            name='date'
            handler={this.handleInputChange}
            value={this.state.date} />

          <br/>

          <button onClick={this.toggleTransactionSign}>
            {(sign)? "+" : "-"}
          </button>

          <input 
            type="number" 
            placeholder="Сумма" 
            autoComplete="off" 
            name='sum'
            value={this.state.sum}
            onChange={this.handleInputChange} 
            autoFocus 
          />

          <br/>

          <Select
            name='category'
            value={this.state.category}
            handler={this.handleInputChange}
            options= {this.props.categories[(sign)? "income" : "spend"]}/>
          
          <br/>

          <Select
            name='tag'
            value={this.state.tag}
            handler={this.handleInputChange}
            options= {this.props.tags[(sign)? "income" : "spend"]}/>

          <br/>

          <textarea
            placeholder = 'Коммент:'
            name='comment' 
            value={this.state.comment}
            onChange={this.handleInputChange}
          />

          <br/>

          <input type="submit" value="OK" />
        </form>
    
        <Link to={parentPath}>
          {"<<<"}
        </Link>
      </div> 
    )
  }
}

export default AddPurchase;