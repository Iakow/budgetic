import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {db: this.props.preCollection} // это уже массив
  }


  UNSAFE_componentWillMount() {
    // здесь мы просто превращаем объект в массив и раздаем его куда надо
    // А НЕ ЛУЧШЕ ЛИ СРАЗУ В БАЗУ ДОАБАВЛЯТЬ В МАССИВ???

    const userTransactions = this.props.db.collection("transactions"); // а это просто объект

    userTransactions.get().then((collection) => {
      let spendingsArr = [];

      collection.forEach((doc) => {
        spendingsArr.push(doc.data());
      });

      this.setState({db : spendingsArr});
      this.props.sendPreCollection(spendingsArr);
    })
  }
  

  formatDate(date) {
    const d = new Date(date);

    const formatedStr = `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}
                         ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    return formatedStr;
  }
  
  render() {
    const statsTable = this.state.db.map((doc, index) => (
      <tbody key = {index}>
        <tr>
          <td>{this.formatDate(doc.date)}</td>
          <td>{doc.sum}</td>
          <td>{doc.category}</td>
          <td>{doc.tag}</td>
          <td>{doc.comment}</td>
        </tr>
      </tbody> 
    ));
    
    return (
      <div>
        <table border="1">{statsTable}</table>

        <h1> Статистика </h1>
        
        <Link to={ROUTES.MAIN}> {"<<<<<"} </Link>
      </div>
    )
  }
}

export default List; 