import React from 'react';
import css from './input.module.css';

class DateStrip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      top: 0,
      value: this.props.value
    };
  }


  handleMouse = (e) => {
    const firstTouchY = e.pageY;
    const { top } = this.state;

    const onMouseMove = (e) => {
      const offset = firstTouchY - e.pageY;

      this.setState({
        top: top - offset
      });
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);

      this.normalizeOffset();

      this.setState({
        value: this.getStrip(true)[2],
        top: 0
      });

      this.sendValueUp();

      document.onmouseup = null;
    };
  }


  handleTouches = (e) => {
    const firstTouchY = e.changedTouches[0].pageY;
    const { top } = this.state;

    const onTouchMove = (e) => {
      const offset = firstTouchY - e.changedTouches[0].pageY;

      this.setState({
        top: top - offset
      });
    }

    document.addEventListener('touchmove', onTouchMove);

    document.ontouchend = (e) => {
      document.removeEventListener('touchmove', onTouchMove);

      this.normalizeOffset();

      this.setState({
        value: this.getStrip(true)[2],
        top: 0
      });

      this.sendValueUp();

      document.ontouchend = null;
    };
  }


  getStrip = (clean = false) => {
    const { value, top } = this.state;
    const { mode, stripItemHeight } = this.props;

    const getStripArr = (minValue, maxValue, startValue = value) => {
      const roundedOffset = Math.trunc(top / stripItemHeight);

      const intervalLenght = maxValue - minValue + 1;

      const currentValue = startValue - roundedOffset % intervalLenght;

      const stripArr = [0, 0, currentValue, 0, 0].map((item, i) => {
        let stripItem = currentValue - (2 - i);

        if (stripItem > maxValue) {
          stripItem = stripItem - intervalLenght;
        }

        if (stripItem < minValue) {
          stripItem = stripItem + intervalLenght;
        }

        return stripItem;
      });

      return stripArr;
    }

    const modeIntervals = {
      fullYear: [-Infinity, Infinity],
      month: [0, 11],
      day: [1, 31],
      hours: [0, 23],
      minutes: [0, 59]
    };

    const [min, max] = modeIntervals[mode];

    const strip = getStripArr(min, max);

    if (clean) return strip;

    if (mode === 'month') {
      const monthes = ['янв.', 'фев.', 'мар.', 'апр.', 'май.', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'];
      return strip.map((item) => monthes[item]);
    }

    if (mode === 'hours' || 'minutes') { // а это условие вообще работает????
      const doubleSign = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
      return strip.map((item) => (item < 10) ? doubleSign[item] : item);
    }

    return strip;
  }

  
  normalizeOffset = () => {
    const { stripElementHeight } = this.props;
    const { top } = this.state;
    const diff = this.state.top % stripElementHeight;

    if (diff > 0) {
      if (diff < stripElementHeight / 2) {
        this.setState({ top: top - diff })
      } else {
        this.setState({ top: top + stripElementHeight - diff })
      }
    }

    if (diff < 0) {
      if (Math.abs(diff) < stripElementHeight / 2) {
        this.setState({ top: top + Math.abs(diff) })
      } else {
        this.setState({ top: top - (stripElementHeight - Math.abs(diff)) })
      }
    }
  }


  sendValueUp = () => {
    this.props.sendValueUp(this.props.mode, this.state.value)
  }


  render() {
    const { stripItemHeight } = this.props;
    const { top } = this.state;
    const topCorrection = -Math.trunc(top / stripItemHeight) * stripItemHeight - stripItemHeight;

    const CSS_handleStripOffset = {
      top: top,
      transform: `translate(0, ${topCorrection}px)`,
    }

    const CSS_viewportAdjustment = {
      top: stripItemHeight,
      height: stripItemHeight
    }

    const CSS_cropContainerAdjustment = { height: stripItemHeight * 3 }

    const stripRender = this.getStrip().map((item, i) => (
      <li key={i} className={css.stripItem} style={{ height: stripItemHeight }}> {item} </li>
    ))

    return (
      <>
        <div className={css.cropContainer} style={CSS_cropContainerAdjustment}>
          <div className={css.viewport} style={CSS_viewportAdjustment}></div>
          <ul
            className={css.strip}
            style={CSS_handleStripOffset}
            onMouseDown={this.handleMouse}
            onTouchStart={this.handleTouches}
          >
            {stripRender}
          </ul>
        </div>
      </>
    )
  }
}

export default DateStrip;