import React from 'react';

const CurrentStock = props => {
  console.log(props);
  return (
    <div>
      {props.currentStock && (
        <div>
          <div>{props.isFetchingStock ? 'true' : 'false'}</div>
          <div>{props.currentStock.symbol}</div>
          <div>{props.currentStock.name}</div>
          <div>{props.currentStock.id}</div>
        </div>
      )}
    </div>
  );
};

export default CurrentStock;
