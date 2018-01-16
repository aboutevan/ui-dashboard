import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import StocksListContainer from '../../containers/stocksListContainer';
import CurrentStockContainer from '../../containers/currentStockContainer';

import StocksList from '../stocksList';

import CurrentStock from '../currentStock';

const Home = props => (
  <div>
    <Grid>
      <Row>
        <Col>
          <h1>Home</h1>

          <p>
            {/*<button onClick={() => props.history.push('/about-us')}>*/}
            {/*Go to about page via redux*/}
            {/*</button>*/}
          </p>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={4}>
          <StocksListContainer>
            {data => <StocksList {...data} />}
          </StocksListContainer>
        </Col>

        <Col xs={12} md={8}>
          <CurrentStockContainer>
            {data => <CurrentStock {...data} />}
          </CurrentStockContainer>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Home;
