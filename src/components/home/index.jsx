import React from 'react'
import CounterContainer from '../../containers/counter/';
import StocksListContainer from '../../containers/stocksList';
import StocksList from '../stocksList';

const Home = props => (
    <div>
      <h1>Home</h1>


      <p><button onClick={() => props.history.push('/about-us')}>Go to about page via redux</button></p>

      <StocksListContainer>
        {(data) => <StocksList {...data} />}
      </StocksListContainer>
    </div>
);

export default Home;
