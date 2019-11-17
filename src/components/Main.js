import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

const Main = () => (
  <div>
    <h1>Главная</h1>

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

export default Main;