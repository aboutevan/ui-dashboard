import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import stocksList from './reducers_stocksList';

// map reducers
// combineReducers passed to store to hook up reducers
export default combineReducers({
  routing: routerReducer,
  counter,
  stocksList,
});