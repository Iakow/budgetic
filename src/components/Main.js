import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {SUM: this.props.sum};
  }

  UNSAFE_componentWillMount() {
    const collectionUsers = this.props.db.collection("users");

    collectionUsers.get().then((qSnapshot) => {
      let sumNumber = null;

      qSnapshot.forEach((doc) => {
        sumNumber += +doc.data().sum;
      });

      this.setState ({SUM : sumNumber});

      this.props.newSum(sumNumber);
    });
  }

  render() {
    return (
      <div>
        <h1>Главная</h1>

        <div>
          {this.state.SUM}
        </div>
        
        <ul>
          <li>
            <Link to={ROUTES.STATS}>
              Статистика
            </Link>
          </li>

          <li>
          <Link to={ROUTES.ADD}>
            Добавить покупку
          </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Main;