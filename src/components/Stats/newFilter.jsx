import React from 'react';
import DatePicker from '../Inputs/DatePicker';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateStart: this.props.dateInterval[0],
      dateEnd: this.props.dateInterval[1],

      sortSum: 'off',
      sortTime: 'off',
      sortCat: 'off',
      sortTag: 'off'
    }
  }


  setSorting = (e) => {
    const switchValue = (current) => {
      const opts = ['off', 'up', 'down'];

      const newIndexInOpts = opts.findIndex((item) => item === current);

      return opts[newIndexInOpts + 1] || opts[0];
    };

    const name = e.target.name;

    if (name === 'sortSum') this.setState({ sortTime: 'off' });
    if (name === 'sortTime') this.setState({ sortSum: 'off' });
    if (name === 'sortCat') this.setState({ sortTag: 'off' });
    if (name === 'sortTag') this.setState({ sortCat: 'off' });

    this.setState({ [name]: switchValue(this.state[name]) });
  }

  
  setDateFilter = (name, value) => {
    this.setState({ [name]: value })
  }


  render() {
    const { dateStart, dateEnd, sortSum, sortTime, sortCat, sortTag } = this.state;

    return (
      <>
        <div className="panel">
          <DatePicker
            value={dateStart}
            handler={this.setDateFilter}
          /> -
          <DatePicker
            value={dateEnd}
            handler={this.setDateFilter}
          />
        </div>
        <div className="body">
          <button onClick={this.setSorting} name="sortSum">{`sortSum: ${sortSum}`}</button>
          <button onClick={this.setSorting} name="sortTime">{`sortTime: ${sortTime}`}</button>
          <button onClick={this.setSorting} name="sortCat">{`sortCat: ${sortCat}`}</button>
          <button onClick={this.setSorting} name="sortTag">{`sortTag: ${sortTag}`}</button>
        </div>

        {this.props.children}
      </>
    )
  }
}

export default Filter;