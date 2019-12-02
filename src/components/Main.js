import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

/*
Вот этот компонент будет отражать круг, кнопки и т.д.
В идеале мы ему должны просто передать пропсы - цифры и ок.

Мы получаем коллекцию, которая должна использоваться и в <Статистике>
Только здесь и там могут быть разные фильтры...
Короче, место этой работе с файрбейс - где-то выше. Или сбоку, хз.

Короче, нужен модуль, который будет раздавать нужные данные из файрбейс в дерево.
*/

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {SUM: this.props.sum};
  }

  UNSAFE_componentWillMount() {
    //получаем коллекцию, проходимся по ней и подсчитываем сумму
    const transactions = this.props.db.collection("users");

    transactions.get()
    .then((collection) => {
      let sumNumber = null;

      collection.forEach((doc) => {
        sumNumber += doc.data().sum;
      });

      // обновляем состояние с этой суммой
      this.setState ({SUM : sumNumber});

      // обновляем состояние контейнера для прелоада
      this.props.upSum(sumNumber);
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