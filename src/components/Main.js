import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {SUM: this.props.sum};
  }

  UNSAFE_componentWillMount() {
    const transactions = this.props.db.collection("transactions");

    transactions.get()
    .then((collection) => {
      let sumNumber = null;

      collection.forEach((doc) => {
        sumNumber += doc.data().sum;
      });

      this.setState ({SUM : sumNumber});

      this.props.upSum(sumNumber);
    });
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <div>
          {this.state.SUM}
        </div>
        
        <ul>
          <li>
            <Link to={ROUTES.STATS}> Статистика </Link>
          </li>

          <li>
            <Link to={ROUTES.ADD}> Добавить покупку </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Main;