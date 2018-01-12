import React from 'react'
import CounterContainer from '../../containers/counter/';

const Home = props => (
    <div>
      <h1>Home</h1>

      <CounterContainer />

      <p><button onClick={() => props.history.push('/about-us')}>Go to about page via redux</button></p>
    </div>
);

export default Home;
