import React from 'react';
import css from './input.module.css';


class TextArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false
    }
  }


  componentDidMount = () => {
    const viewport = document.querySelector('meta[name=viewport]');
    const viewheight = document.documentElement.clientHeight;
    const attr = `height=${viewheight}, width=device-width, initial-scale=1.0`;

    viewport.setAttribute('content', attr);
  }


  edit = () => {
    this.setState({ isFocused: true })
  }


  filterKeys = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
    }

    if (e.keyCode === 8 && `${e.target.innerHTML}`.length === 1) {
      e.target.innerHTML = '\u00A0';
      e.preventDefault()
    }
  }


  submit = (e) => {
    const value = e.target.innerHTML;

    const { handler, name } = this.props;

    const formattedValue = value
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .trim()

    if (value !== '&nbsp;') {
      handler(name, formattedValue)
    } else {
      handler(name, '')
    }

    this.setState({ isFocused: false })
  }


  render() {
    const { isFocused } = this.state;
    const { value } = this.props;
    const placeholderText = this.props.placeholder;

    const placeholder = (
      <span className={css.comment_placeholder}>
        {placeholderText}
      </span>
    )

    let inner = value;

    if (!value) {
      if (isFocused) {
        inner = '\u00A0';
      } else {
        inner = placeholder;
      }
    }

    return (
      <div
        contentEditable="true"
        onFocus={this.edit}
        onKeyDown={this.filterKeys}
        onBlur={this.submit}
        className={css.comment}
        suppressContentEditableWarning={true}
      >
        {inner}
      </div>
    )
  }
}


export default TextArea;