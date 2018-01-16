import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actions } from '../../reducers/reducers_currentStock';

const { getCurrentStock, setCurrentStock } = actions;

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
