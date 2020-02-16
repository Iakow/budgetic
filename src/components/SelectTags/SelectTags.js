import React from 'react';
import './SelectTags.css';

class SelectTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      chekedOptions: [],

    }
  }

  checkOption = (e)=> {
    const [checkedOptionArr] = [this.state.chekedOptions];
    checkedOptionArr.push(this.props.options[e.target.dataset.index]);

    this.setState({chekedOptions: checkedOptionArr, open: false})
  }

  toogle = ()=> {
    this.setState({open: !this.state.open})
  }

  removeCheckedTag = (e)=> {
    e.stopPropagation();
    const [checkedOptionArr] = [this.state.chekedOptions];
    checkedOptionArr.splice(e.target.dataset.index,1);

    this.setState({chekedOptions: checkedOptionArr});
  }

  render () {
    const list = (!this.state.open) ? null :
      this.props.options.map((tag, i)=> {
        const className = (this.state.chekedOptions.includes(tag)) ? "checked" : null;
        const handler = (this.state.chekedOptions.includes(tag)) ? null : this.checkOption;

        return (
        <li key={i} className={className} data-index={i} onClick={handler}>
          {tag}
        </li>
      )})

    const checked = (this.state.chekedOptions.length === 0) ? "Выберите тег" : (
      <ul className="chosenTagsList">
        {this.state.chekedOptions.map((chekedTag, i)=> (
          <li key={i}>
            <span>{chekedTag}</span>
            <button onClick={this.removeCheckedTag} data-index={i}>
              &times;
            </button>
          </li>
        ))}
      </ul>
    )
     
    return (
      <div>
        <div className='Input' onClick={this.toogle}>{checked}</div>
        <ul>
          {list}
        </ul>
      </div>
      
    )

  }
}

export default SelectTags;