import axios from 'axios';
import { findIndex } from 'lodash';
const baseUrl = 'https://api.iextrading.com/1.0';
const logoUrl = `${baseUrl}/price/`;

export const types = {
  SET_CURRENT_STOCK: 'SET_CURRENT_STOCK',
  GET_CURRENT_STOCK: 'GET_CURRENT_STOCK',
  REQUEST_CURRENT_STOCK: 'REQUEST_CURRENT_STOCK',
  RECEIVED_CURRENT_STOCK: 'RECEIVED_CURRENT_STOCK'
};

export const intialState = {
  currentStock: {},
  isFetchingStock: false,
  cachedEntities: []
};

export default (state = intialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_STOCK:
      console.log(action.stock);
      // check if exists
      let stockCached =
        findIndex(state.cachedEntities, { symbol: action.stock.symbol }) > -1;

      // copy the existing array
      let cachedCopy = state.cachedEntities.slice();

      const stockObj = {
        // id: action.stock.iexId,
        symbol: action.stock.symbol,
        name: action.stock.companyName
      };

      if (!stockCached) {
        cachedCopy.push(stockObj);
      }

      return Object.assign({}, state, {
        currentStock: stockObj,
        cachedEntities: cachedCopy
      });

    case types.REQUEST_CURRENT_STOCK:
      return {
        ...state,
        isFetchingStock: true
      };

    case types.RECEIVED_CURRENT_STOCK:
      return {
        ...state,
        isFetchingStock: false
      };

    case types.GET_CURRENT_STOCK:
      return {
        ...state
      };

    default:
      return state;
  }
};

const setCurrentStock = stock => {
  return {
    type: types.SET_CURRENT_STOCK,
    stock
  };
};

const requestCurrentStock = slug => {
  const slugToLowerCase = slug;

  return axios
    .get(`${baseUrl}/stock/${slugToLowerCase}/quote/`)
    .then(response => {
      // setCurrentStock(response.data);
      console.log(response.data);
    });
};

export const actions = {
  setCurrentStock: stock => {
    console.log('setCurrent');
    return dispatch => {
      dispatch(setCurrentStock(stock));
    };
  },

  requestCurrentStock: stock => {
    const symbol = stock.symbol.toLowerCase();

    return (dispatch, getState) => {
      const cachedEntities = getState().currentStock.cachedEntities;
      console.log();
      if (findIndex(cachedEntities, { symbol }) > -1) {
        console.log('cached');
        setCurrentStock(stock);
      } else {
        dispatch({
          type: types.REQUEST_CURRENT_STOCK
        });

        return axios.get(`${baseUrl}/stock/${symbol}/quote/`).then(response => {
          dispatch(setCurrentStock(response.data));
          dispatch({
            type: types.RECEIVED_CURRENT_STOCK
          });
        });
      }
    };
  }
};
