import React from 'react';

/* Надо на чекбоксах, т.к. надо ченутость должна отображаться*/

class Settings extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      transaction:'spend',
      attribute:'categories'
    }
  }

  radioHandler = (e)=> {
    this.setState({
      [e.target.name]: e.target.value
      });
  }
  
  render () {
      const x = this.state.transaction;
      const y = this.state.attribute;

    return (
      
      <div>
        <label><input
          type="radio"
          name="transaction"
          value="spend"
          onChange={this.radioHandler}
          defaultChecked/> spend
        </label>

        <label>
          <input
            type="radio"
            name="transaction"
            value="income"
            onChange={this.radioHandler}
            /> income
        </label>
        <br/>

        <label>
          <input
            type="radio"
            name="attribute"
            value="tags"
            onChange={this.radioHandler}/> tags
        </label>

        <label>
          <input
            type="radio"
            name="attribute"
            value="categories"
            onChange={this.radioHandler}
            defaultChecked/> categories
        </label>

        <br/>
        
        {this.props[y][x].map((item, index) => (
          <ul key = {index}>
            <li>{item}</li>
          </ul> 
        ))}
      </div>
    )
  }
}

export default Settings;