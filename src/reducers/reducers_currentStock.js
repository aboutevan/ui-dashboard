import axios from 'axios';
import { find, findIndex } from 'lodash';
const baseUrl = 'https://api.iextrading.com/1.0';
// const logoUrl = `${baseUrl}/price/`;

export const types = {
  SET_CURRENT_STOCK: 'SET_CURRENT_STOCK',
  GET_CURRENT_STOCK: 'GET_CURRENT_STOCK',
  REQUEST_CURRENT_STOCK: 'REQUEST_CURRENT_STOCK',
  RECEIVED_CURRENT_STOCK: 'RECEIVED_CURRENT_STOCK'
};

export const intialState = {
  currentStock: null,
  isFetchingStock: false,
  cachedEntities: []
};

export default (state = intialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_STOCK:
      // check if exists
      let stockCached =
        findIndex(state.cachedEntities, { symbol: action.stock.symbol }) > -1;

      // copy the existing array
      let cachedCopy = state.cachedEntities.slice();

      if (!stockCached) {
        cachedCopy.push(action.stock);
      }

      return Object.assign({}, state, {
        currentStock: find(
          cachedCopy,
          obj => obj.symbol === action.stock.symbol
        ),
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
  console.log('setCurrentStock');
  return {
    type: types.SET_CURRENT_STOCK,
    stock
  };
};

const getStockData = (symbol, dispatch) => {
  let stockObj = {
    chart: {},
    stats: {}
  };

  return axios
    .get(`${baseUrl}/stock/${symbol}/quote/`)
    .then(response => {
      stockObj = { ...stockObj, ...response.data };
      return axios.get(`${baseUrl}/stock/${symbol}/chart/3m`);
    })
    .then(response => {
      // stockObj.chart['3m'] = response.data;
      stockObj = {
        ...stockObj,
        chart: {
          '3m': response.data
        }
      };
      return axios.get(`${baseUrl}/stock/${symbol}/stats`);
    })
    .then(response => {
      stockObj.stats = response.data;
      dispatch(setCurrentStock(stockObj));
      dispatch({
        type: types.RECEIVED_CURRENT_STOCK
      });
    });
};

export const actions = {
  setCurrentStock: stock => {
    return dispatch => {
      dispatch(setCurrentStock(stock));
    };
  },

  requestCurrentStock: stock => {
    const symbol = stock.symbol;

    return (dispatch, getState) => {
      const cachedEntities = getState().currentStock.cachedEntities;

      if (findIndex(cachedEntities, { symbol }) > -1) {
        dispatch(setCurrentStock(stock));
      } else {
        dispatch({
          type: types.REQUEST_CURRENT_STOCK
        });

        getStockData(symbol, dispatch);
      }
    };
  }
};
