import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

class AddPurchase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: Date.now(),
      sum: '', 
      comment: '', 
      tag: '', 
      category: '', 
      submit: false,
      isItIncome: false
    };
  }


  timestampToString = (timestamp)=> {
    const d = new Date(timestamp);

    const DD = (d.getDate()>9) ? d.getDate() : `0${d.getDate()}`;
    const MM = ((d.getMonth()+1)>9) ? d.getMonth()+1 : `0${d.getMonth()+1}`;
    const YYYY = d.getFullYear();

    const HH = ((d.getHours()>9)) ? d.getHours() : `0${d.getHours()}`;
    const MI = ((d.getMinutes()>9)) ? d.getMinutes() : `0${d.getMinutes()}`;

    return YYYY+'-'+MM+'-'+DD+'T'+HH+':'+MI;
  }

  stirngToTimestamp = (htmlDate)=> {
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
    this.setState({
      [e.target.name]: e.target.value
    });
  }


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
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }


  handleSubmit = (e)=> {
    e.preventDefault();
    
    if (+this.state.sum) {
      this.addTransaction()
    } else {
      alert('Надо ввести сумму')
    }
  }


  render() {
    const transactionDirection = this.state.isItIncome? 'income' : 'spend';

    const tagsSelectOptions = this.props.tags[transactionDirection].map((tag, i) => (
      <option key = {i} value={tag}>
        {tag}
      </option> 
    ));

    const categoriesSelectOptions = this.props.categories[transactionDirection].map((category, i) => (
      <option key = {i} value={category}>
        {category}
      </option> 
    ));

    const signButtonText = this.state.isItIncome? "+" : "-";
    const message = this.state.isItIncome? "Доходы" : "Расходы";

    return (this.state.submit) ? <Redirect to="/" /> : (
      <div>
        <p>{message}</p>
        <input 
          type='datetime-local' 
          onChange={(e)=> {this.setState({date: this.stirngToTimestamp(e.target.value)})}}
          value={this.timestampToString(this.state.date)}/>

        <form onSubmit={this.handleSubmit}>
          <button onClick={this.toggleTransactionSign}>
            {signButtonText}
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

          <select name='category' value={this.state.category} onChange={this.handleInputChange}>
            <option value='' disabled>
              Категория
            </option>
            {categoriesSelectOptions}
          </select>
          
          <br/>
          
          <select name='tag' value={this.state.tag} onChange={this.handleInputChange}>
            <option value='' disabled>
              Теги
            </option>
            {tagsSelectOptions}
          </select>

          <br/>

          <textarea
            placeholder = 'Коммент:'
            name='comment' 
            value={this.state.comment} 
            onChange={this.handleInputChange} 
          />

          <br/>

          <input type="submit" value="Добавить" />
        </form>
    
        <Link to={ROUTES.MAIN}>
          {"<<<"}
        </Link>
      </div> 
    )
  }
}

export default AddPurchase;