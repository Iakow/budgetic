import React from 'react';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0
    }
  }
 
  handleTab = (e)=> {
    this.setState({tab: e.target.getAttribute('name')})
  }

  render() {
    return (
      <div className="Tabs">
        <div className="body">
          {this.props.tabs[this.state.tab]}
        </div>

        <div
          className="tabs"
        >
          {this.props.titles.map((item, i) => (
            <span key={i} name={i} onClick={this.handleTab}>{item}</span>
          ))}
        </div>
      </div>
    );
  }
}

export default Tabs;