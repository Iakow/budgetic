import React from 'react';
import styles from './form.module.css';
import DatePicker from '../Inputs/DatePicker';
import NumberInput from '../Inputs/NumberInput';
import Select from '../Inputs/Select';
import MultiSelect from '../Inputs/MultiSelect';
import TextArea from '../Inputs/TextArea';


class TransactionForm extends React.Component {
  constructor(props) {
    super(props);

    const transaction = this.props.transaction;

    this.state = transaction ?
      {
        date: transaction.date,
        sum: (Math.abs(transaction.sum)).toString(),
        comment: transaction.comment,
        tag: transaction.tag,
        category: transaction.category,
        submit: false,
        moneyDirection: (transaction.sum > 0) ? 'income' : 'spend',
      }
      :
      {
        date: Date.now(),
        sum: '',
        comment: '',
        tag: [],
        category: '',
        submit: false,
        moneyDirection: 'spend',
      }
  }


  toggleTransactionSign = (e) => {
    this.setState((state) => ({
      moneyDirection: (state.moneyDirection === 'income') ? 'spend' : 'income',
      tag: [],
      category: ''
    }))
  }


  handler = (name, value) => this.setState({ [name]: value })


  handleSubmit = (e) => {
    e.preventDefault();

    const { date, comment, tag, category } = this.state; // is posible more simple??? *
    const sum = (this.state.moneyDirection === 'income') ? +this.state.sum : -this.state.sum;

    const doc = { sum, date, comment, category, tag }; // *

    if (+this.state.sum) {
      this.props.handler(doc)
    } else {
      alert('Надо ввести сумму')
    }
  }


  render() {
    const { date, tag, category, sum, moneyDirection } = this.state;
    const { categories, tags } = this.props;

    return (
      <div className={styles.transactionForm}>
        <form onSubmit={this.handleSubmit} className={styles.formContainer}>
          <DatePicker value={date} handler={this.handler} />

          <NumberInput value={sum} handler={this.handler} />

          <Select
            options={categories[moneyDirection]}
            value={category}
            handler={this.handler}
            name="category"
          />

          <MultiSelect
            options={tags[moneyDirection]}
            value={tag}
            handler={this.handler}
            name="tag"
          />

          <div className={styles.money_direction}>
            <label>
              <input
                type="radio"
                name="moneyDirection"
                value="income"
                checked={moneyDirection === 'income'}
                onChange={this.toggleTransactionSign}
              />
              Доходы
            </label>

            <label>
              <input
                type="radio"
                name="moneyDirection"
                value="spend"
                checked={moneyDirection === 'spend'}
                onChange={this.toggleTransactionSign}
              /> Расходы
            </label>
          </div>

          <TextArea />

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