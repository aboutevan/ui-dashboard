import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CurrentStockContainer extends Component {
  static propTypes: {
    children: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return <div>{this.props.children(this.props)}</div>;
  }
}

const mapStateToProps = state => ({
  isFetchingStock: state.currentStock.isFetchingStock,
  currentStock: state.currentStock.currentStock,
  cachedEntities: state.currentStock.cachedEntities
});

export default connect(mapStateToProps)(CurrentStockContainer);
