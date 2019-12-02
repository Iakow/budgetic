import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../constants/routes';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {db: []}
  }

  UNSAFE_componentWillMount() {
    const transactions = this.props.db.collection("users");

    transactions.get()
    .then((collection) => {
      let dbArr = [];

      collection.forEach((doc) => {
        dbArr.push(doc.data());
      });

      this.setState({db : dbArr});

      console.log(this.state.db[0]);
    })
  }

  render() {

    const listItems = this.state.db.map((arr) =>
      (<tbody>
        <tr>
        <td>{arr.date}</td>
        <td>{arr.sum}</td>
        <td>{arr.category}</td>
        <td>{arr.tag}</td>
        <td>{arr.comment}</td>
      </tr>
        </tbody>)
    );

   

    return (
      <div>
        <table border="1">
          {listItems}
        </table>

        <h1>Статистика</h1>
        
        <Link to={ROUTES.MAIN}>
          На главную
        </Link>
      </div>
    )
  }
}

export default List;