import React from 'react';

const Counter = props => (
  <div>
    <p>Count: {props.count}</p>

    <p>
      <button onClick={props.increment} disabled={props.isIncrementing}>Increment</button>
      <button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
    </p>

    <p>
      <button onClick={props.decrement} disabled={props.isDecrementing}>Decrement</button>
      <button onClick={props.decrementAsync} disabled={props.isDecrementing}>Decrement Async</button>
    </p>
  </div>
);

export default Counter;