import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../../reducers/counter';
import Counter from '../../components/counter/';

const {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} = actions;

const CounterContainer = props => (
    <Counter {...props} />
);

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
});

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CounterContainer)