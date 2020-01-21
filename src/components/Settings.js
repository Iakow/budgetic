import React from 'react';
import * as firebase from 'firebase/app';

class Settings extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      moneyDirection:'spend',
      transactionAtribute:'categories'
    }
  }

  radioHandler = (e)=> {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addTag = (e)=> {
    //console.log(this.props.firestore.collection('users').doc(this.props.user));
  }
  
  render () {
      const moneyDirection = this.state.moneyDirection;
      const transactionAtribute = this.state.transactionAtribute;

    return (
      
      <div>
        <label><input
          type="radio"
          name="moneyDirection"
          value="spend"
          onChange={this.radioHandler}
          defaultChecked/> spend
        </label>

        <label>
          <input
            type="radio"
            name="moneyDirection"
            value="income"
            onChange={this.radioHandler}
            /> income
        </label>

        <br/>

        <label>
          <input
            type="radio"
            name="transactionAtribute"
            value="tags"
            onChange={this.radioHandler}/> tags
        </label>

        <label>
          <input
            type="radio"
            name="transactionAtribute"
            value="categories"
            onChange={this.radioHandler}
            defaultChecked/> categories
        </label>

        <br/>
        
        {this.props[transactionAtribute][moneyDirection].map((item, index) => (
          <ul key = {index}>
            <li style={{listStyleType: 'none'}}>
              {item}
              <button>&#65794;</button>
            </li>
          </ul> 
        ))}

        <input ></input>

        <button onClick={this.addTag}>
          Добавить
        </button>
      </div>
    )
  }
}

export default Settings;