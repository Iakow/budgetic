import React from 'react';
//import Select from './Select';
//import DateInput from "./DateInput";
import styles from './form.module.css';
import DatePicker from '../Inputs/DatePicker';
import NumberInput from '../Inputs/NumberInput';
import Select from '../Inputs/Select';
import MultiSelect from '../Inputs/MultiSelect';


class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: this.props.transaction ? this.props.transaction.date : Date.now(),
      sum: this.props.transaction ? (Math.abs(this.props.transaction.sum)).toString() : '',
      comment: '',
      tag: this.props.transaction ? this.props.transaction.tag : [],
      category: this.props.transaction ? this.props.transaction.category : '',
      submit: false,
      moneyDirection: 'income'
    };
  }


  componentDidMount = () => {
    if (this.props.mode === 'edit') {
      const { date, comment, tag, category } = this.props.transaction;

      const moneyDirection = (this.props.transaction.sum > 0) ? 'income' : 'spend';
      const sum = (Math.abs(this.props.transaction.sum)).toString(); // мож не надо приводить тут?

      this.setState({ date, sum, comment, tag, category, moneyDirection });
    }
  }

  toggleTransactionSign = (e) => {
    e.preventDefault();

    this.setState({
      moneyDirection: (this.state.moneyDirection === 'income') ? 'spend' : 'income',
      tag: [],
      category: ''
    })
  }

  /* переделать все инпуты под этот метод */
  handler = (name, value) => this.setState({ [name]: value })

  handleInputChange = (e) => {
    if (e.target.type === 'select-multiple') {
      const options = e.target.options;
      const value = [];

      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }

      this.setState({ [e.target.name]: value });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { date, comment, tag, category } = this.state;
    const sum = (this.state.moneyDirection === 'income') ? +this.state.sum : -this.state.sum;

    const doc = { sum, date, comment, category, tag };

    if (+this.state.sum) {
      this.props.handler(doc)
    } else {
      alert('Надо ввести сумму')
    }
  }

  render() {
    const title = (this.state.moneyDirection === 'income') ?
      (<p className={styles.income}> Доходы</p>) :
      (<p className={styles.spend}> Расходы</p>);


    return (
      <div className={styles.transactionForm}>
        {title}

        <form onSubmit={this.handleSubmit} className={styles.formContainer}>
          <br />

          <DatePicker
            value={this.state.date}
            handler={this.handler}
          />

          <div className={`${styles.field} ${styles.flex}`}>
            <button onClick={this.toggleTransactionSign} className={styles.plus}>
              {(this.state.moneyDirection === 'income') ? "+" : "-"}
            </button>

            {/*   <input
              className={styles.sum}
              type="number"
              step="any"
              min='1'
              placeholder="Сумма"
              autoComplete="off"
              name='sum'
              value={this.state.sum}
              onChange={this.handleInputChange}
            /> */}

          </div>

          <NumberInput
            value={this.state.sum}
            handler={this.handler}
          />


          <br />

          {/* <Select
            name='category'
            value={this.state.category}
            handler={this.handleInputChange}
            options={this.props.categories[this.state.moneyDirection]} /> */}

          <Select
            value={this.state.category}
            options={this.props.categories[this.state.moneyDirection]}
            handler={this.handler}
          />

          <br />

          {/*  <Select
            name='tag'
            value={this.state.tag}
            handler={this.handleInputChange}
            options={this.props.tags[this.state.moneyDirection]}
            multiple={true} /> */}

          <MultiSelect
            value={this.state.tag}
            options={this.props.tags[this.state.moneyDirection]}
            handler={this.handler}
          />

          <br />

          <textarea
            className={styles.field}
            placeholder='Коммент:'
            name='comment'
            value={this.state.comment}
            onChange={this.handleInputChange}
          />

          <br />

          <div className={styles.buttons_block}>
            <input className={styles.button} type="submit" value="OK" />
            <input className={styles.button} type="button" value="Отмена" onClick={this.props.cancel} />
          </div>

        </form>
      </div>
    )
  }
}

export default TransactionForm;