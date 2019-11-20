import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

/* Разобраться, как отрендерить SUM, когда она уже посчитается. Наверное, сетСтейт

   Если мы попадаем на страницу, нажав НАЗАД в статистике, нахуя мне обращаться к БД?

*/

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {SUM: null};
  }

  UNSAFE_componentWillMount() {
    const usersBD = this.props.db.collection("users");

    usersBD.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log(typeof doc.data().sum);

        let sumNumber = +doc.data().sum;

        if (sumNumber) {
          this.setState ({SUM : this.state.SUM + sumNumber});
        }
      });
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