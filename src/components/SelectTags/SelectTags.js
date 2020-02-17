import React from 'react';
import styles from './SelectTags.module.css';

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

    this.setState({
      chekedOptions: checkedOptionArr,
      open: false
    })
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
    const tagsList = (!this.state.open) ? null :
      this.props.options.map((tag, i)=> {
        const availableТag = (
          <li key={i} data-index={i} onClick={this.checkOption}>
            {tag}
          </li>)

        const pickedTag = (
          <li key={i} className={styles.inactive} data-index={i}>
            {tag}
          </li>)

        return (this.state.chekedOptions.includes(tag)) ? pickedTag : availableТag
      })

    const checkedTags = (this.state.chekedOptions.length === 0) ? "Выберите теги" : (
      <ul className={styles.chosenTagsList}>
        {this.state.chekedOptions.map((chekedTag, i)=> (
          <li key={i} className={styles.chosenTag}>
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
        <div className='Input' onClick={this.toogle}>
          {checkedTags}
        </div>

        <ul>
          {tagsList}
        </ul>
      </div>
      
    )

  }
}

export default SelectTags;