import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

const AddPurchase = () => (
  <div>
    <h1>Добавить покупку</h1>
    
    <Link to={ROUTES.MAIN}>
      На главную
    </Link>
  </div>
)

export default AddPurchase;