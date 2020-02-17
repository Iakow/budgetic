import React from 'react';
import Select from './Select';
import DateInput from "./DateInput";

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: Date.now(),
      sum: '',
      comment: '', 
      tag: [],
      category: '', 
      submit: false,
      moneyDirection: 'spend'
    };
  }

  componentDidMount = ()=> {
    if (this.props.mode === 'edit') {
      const {date, comment, tag, category} = this.props.transaction;

      const moneyDirection = (this.props.transaction.sum>0) ? 'income' : 'spend';
      const sum = (Math.abs(this.props.transaction.sum)).toString();

      this.setState({date, sum, comment, tag, category, moneyDirection})
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

    this.setState({
      moneyDirection: (this.state.moneyDirection === 'income') ? 'spend' : 'income',
      tag: '', // надо сделать массивом
      category: ''
    })
  }

  handleInputChange = (e)=> {
    if(e.target.type === 'datetime-local') {
      this.setState({
        [e.target.name]: this.htmlStirngToTimestamp(e.target.value)
      });
    }

    if(e.target.type === 'select-multiple') {
      const options = e.target.options;
      const value = [];
      
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }

      this.setState({
        [e.target.name]: value
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    

    
  }

  handleSubmit = (e)=> {
    e.preventDefault();

    const {date, comment, tag, category} = this.state;
    const sum = (this.state.moneyDirection === 'income') ? +this.state.sum : -this.state.sum;

    const doc = {sum, date, comment, category, tag};

    if (+this.state.sum) {
      this.props.handler(doc)
    } else {
      alert('Надо ввести сумму')
    }
  }

  render() {
    return (
      <div className="transactionForm">
        <p>{(this.state.moneyDirection === 'income')? "Доходы" : "Расходы"}</p>

        <form onSubmit={this.handleSubmit}>
          <DateInput
            name='date'
            handler={this.handleInputChange}
            value={this.state.date} />

          <br/>

          <button onClick={this.toggleTransactionSign}>
            {(this.state.moneyDirection === 'income')? "+" : "-"}
          </button>

          <input 
            type="number"
            min='1'
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
            options= {this.props.categories[this.state.moneyDirection]} />
          
          <br/>

          <Select
            name='tag'
            value={this.state.tag}
            handler={this.handleInputChange}
            options= {this.props.tags[this.state.moneyDirection]}
            multiple={true} />

          <br/>

          <textarea
            placeholder = 'Коммент:'
            name='comment' 
            value={this.state.comment}
            onChange={this.handleInputChange}
          />

          <br/>

          <input type="submit" value="OK" />
          <input type="button" value="Отмена" onClick={this.props.cancel}/>
        </form>
      </div> 
    )
  }
}

export default TransactionForm;