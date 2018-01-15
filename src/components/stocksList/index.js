import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import './index.css';

class StocksList extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(stock) {
    this.props.requestCurrentStock(stock.symbol.toLowerCase());
    this.props.setCurrentStock(stock);
  }

  renderList() {
    return (
      <ListGroup>
        {this.props.entities.map(entity => {
          return (
            <ListGroupItem
              onClick={() => this.handleClick(entity)}
              key={entity.symbol}
            >
              {entity.name}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }

  componentWillMount() {
    this.props.requestData();
  }

  render() {
    console.log(this.props);
    return (
      <div className={`stock-list`}>
        {this.props.isFetching ? <div>Please Wait</div> : this.renderList()}
        <button
          onClick={this.props.requestData}
          disabled={this.props.isFetching}
        >
          Fetch Again
        </button>
      </div>
    );
  }
}

export default StocksList;
