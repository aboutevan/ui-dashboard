import React from 'react';

const activeStock = props => (
  <code>{props.currentStock && <div>{props.currentStock.symbol}</div>}</code>
);

export default activeStock;
