import React from 'react';
import css from './input.module.css';

class TextArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      isFocused: false
    }
  }

  componentDidMount = () => {
    const viewport = document.querySelector('meta[name=viewport]');
    const viewheight = document.documentElement.clientHeight;
    const attr = `height=${viewheight}px, width=device-width, initial-scale=1.0`;

    viewport.setAttribute('content', attr);
  }

  render() {
    return (
      <input
        className={css.comment}
        type="textarea"
        placeholder="Comment"
      />
    )
  }
}

export default TextArea;