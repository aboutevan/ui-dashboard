import React from 'react';
import CounterContainer from '../../containers/counter/';
import StocksListContainer from '../../containers/stocksList/stocksListContainer';
import CurrentStockContainer from '../../containers/currentStock/currentStockContainer';

import StocksList from '../stocksList';

import CurrentStock from '../currentStock';

const Home = props => (
  <div>
    <h1>Home</h1>

    <p>
      <button onClick={() => props.history.push('/about-us')}>
        Go to about page via redux
      </button>
    </p>

    <StocksListContainer>
      {data => <StocksList {...data} />}
    </StocksListContainer>

    <CurrentStockContainer>
      {data => <CurrentStock {...data} />}
    </CurrentStockContainer>
  </div>
);

export default Home;
