import React from 'react';

const Diagram = (props)=> {
  return (
    <div className={"diagram " + props.className} >
     <p>Будут отображаться суммы относительно категорий. Выборка - по фильтру</p>
     <p>Какие еще врианты кроме как по категориям?</p>
     <p>А как быть с разделением доходов и расходов? Для таблицы хорошо бы и то, и другое отображать. А для диаграммы надо разделять.</p>
    </div>)
}

export default Diagram;