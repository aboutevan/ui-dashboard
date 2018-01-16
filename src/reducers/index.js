import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './reducers_counter';
import stocksList from './reducers_stocksList';
import currentStock from './reducers_currentStock';

// map reducers
// combineReducers passed to store to hook up reducers
export default combineReducers({
  routing: routerReducer,
  counter,
  stocksList,
  currentStock
});
