import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

const List = () => (
  <div>
    <h1>Статистика</h1>
    
    <Link to={ROUTES.MAIN}>
      На главную
    </Link>
  </div>
)

export default List;