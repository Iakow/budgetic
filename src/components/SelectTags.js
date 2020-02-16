import React from 'react';

class SelectTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  toogle = ()=> {
    this.setState({open: !this.state.open})
  }

  render () {
    const list = (this.state.open) ? <div>list</div> : null
    return (
      <div>
        <div className='Input' onClick={this.toogle}>list</div>
       {list}
      </div>
      
    )

  }
}

export default SelectTags;