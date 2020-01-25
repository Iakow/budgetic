import React from 'react';
import * as firebase from 'firebase/app';

class Settings extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      moneyDirection:'spend',
      transactionAtribute:'categories',
      newTag: ''
    }
  }

  radioHandler = (e)=> {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleInputChange = (e)=> {
    this.setState({
      newTag: e.target.value
    });
  }
  
  addTag = (e)=> {
    this.props.db.collection('settings').doc(this.state.transactionAtribute).update({
      [this.state.moneyDirection]: firebase.firestore.FieldValue.arrayUnion(this.state.newTag)
    });
    this.setState({
      newTag:''
    })
  }

  deleteTag = (e)=> {
    this.props.db.collection('settings').doc(this.state.transactionAtribute).update({
      [this.state.moneyDirection]: firebase.firestore.FieldValue.arrayRemove(e.target.name)
    });
  }
  
  render () {
      const moneyDirection = this.state.moneyDirection;
      const transactionAtribute = this.state.transactionAtribute;

      const list = (
        <div>
          {this.props[transactionAtribute][moneyDirection].map((item, index) => (
            <ul key = {index}>
              <li style={{listStyleType: 'none'}}>
                {item}
                <button name={item} onClick={this.deleteTag}>&#65794;</button>
              </li>
            </ul> 
          ))}
        
          <input
            value={this.state.newTag}
            onChange={this.handleInputChange} 
          />

          <button onClick={this.addTag}>
            Добавить
          </button>
        </div>
      )

      const filter = (
        <form className='filter'>
          <label>
            <input
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
        </form>
      )

    return (
      <div>
        {filter}
        <br/>
        {list} 
      </div>
    )
  }
}

export default Settings;