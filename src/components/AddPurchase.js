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
      sum: '',
      comment: '', 
      tag: '', 
      category: '', 
      submit: false,
      moneyDirection: 'spend'
    };
  }

  componentDidMount = ()=> {
    if (this.props.mode === 'edit') {
      const {date, comment, tag, category} = this.props.transaction;
      const moneyDirection = (this.props.sum>0) ? 'income' : 'spend';
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
      tag: '', 
      category: ''
    })
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


  addTransaction = ()=> {
    const {date, comment, tag, category} = this.state;
    const sum = (this.state.moneyDirection === 'income') ? +this.state.sum : -this.state.sum;
    const TRANSACTIONS = this.props.db.collection('transactions');

    TRANSACTIONS.add({sum, date, comment, category, tag})
    .then((docRef)=> {
      console.log("Document written with ID: ", docRef.id);
      this.setState({submit: true});
    })
    .catch((error)=> {
      console.error("Error adding document: ", error);
    });
  }

  editTransaction = ()=> {
    const TRANSACTION = this.props.db.collection('transactions').doc(this.props.transaction.id);
    const {date, comment, tag, category} = this.state;
    const sum = (this.state.moneyDirection === 'income') ? +this.state.sum : -this.state.sum;

    TRANSACTION.set({sum, date, comment, category, tag})
    .then(()=> {
      console.log("Document is updated");
      this.props.done()
    })
    .catch((error)=> {
        console.error("Error editing document: ", error);
    });
  }

  /* Этот компонент должен просто собирать инфомрацию в кучу и передавать родителю, а тот уже пускай решает куда переходить в приложении
     Как хендлер для инпутов. Это просто форма и для нее не должно быть разницы между редактированием и добавлением дока.
     Т.е. от пропса mode можно избавляться */

  handleSubmit = (e)=> {
    e.preventDefault();

    if (+this.state.sum) {
      (this.props.mode === 'edit') ? this.editTransaction() : this.addTransaction()
    } else {
      alert('Надо ввести сумму')
    }
  }

  render() {
    const parentPath = (this.props.mode === 'edit') ? '/stats' : '/';

    return (this.state.submit) ? <Redirect to={parentPath} /> : (
      <div>
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
            options= {this.props.tags[this.state.moneyDirection]} />

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
    
        <Link to={parentPath}> {/* вот эта хуйня, выходит, еще должна менять состояние List */}
          {"<<<"}
        </Link>
      </div> 
    )
  }
}

export default AddPurchase;