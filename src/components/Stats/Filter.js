import React from 'react';
import DateInput from '../Form/DateInput';

const Filter = ()=> {
  return (
    <div className="filter">
      <h2>Тут фомрируется состояние в Stats - фильтруется массив из пропсов. Который потом раздается в таблицу и диаграмму</h2>

      <ul>
        <li>временной промежуток</li>
        <li>доходы/расходы (тут как-то разделить логику диаграммы и таблицы)</li>
        <li></li>
      </ul>
      <div className='dateRange'>
        <DateInput/>
        <DateInput/>
        <p>надо в инпуты передать какие-то начальные пропсы</p>
        <p>и нахуя мне тут время в инпутах?</p>
      </div>
    </div>
  )
}

export default Filter;