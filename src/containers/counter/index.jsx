import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../../reducers/counter';
import Counter from '../../components/counter/';

const { increment, incrementAsync, decrement, decrementAsync } = actions;

const CounterContainer = props => (
  // passing props to Counter component
  <Counter {...props} />
);

// if state ever changes, this container component
// will automatically rerender

const mapStateToProps = state => ({
  // state argument is the entire state of the app
  // via redux

  // Whatever is returned will show up as props
  // inside CounterContainer
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
});

// whenever these action creators are called,
// the result should be passed to all reducers
//
// bindActionCreators with dispatch wraps all actions
// in dispatch and sends them through reducers
//
// anthing returned from this function will end up
// as props in container
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync
    },
    dispatch
  );

// promote component to container - needs to know about
// state and dispatch methods. make these available as props
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
