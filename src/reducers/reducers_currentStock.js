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
        chart: action.stock.chart,
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

const getStockData = (symbol, dispatch) => {
  return axios.get(`${baseUrl}/stock/${symbol}/quote/`).then(response =>
    axios.get(`${baseUrl}/stock/${symbol}/chart/6m`).then(chart => {
      const stockObj = response.data;

      stockObj.chart = {};
      stockObj.chart['1m'] = chart.data;

      dispatch(setCurrentStock(stockObj));
      dispatch({
        type: types.RECEIVED_CURRENT_STOCK
      });
    })
  );
};

const getStockChart = (symbol, dispatch) => {};

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
        setCurrentStock(stock);
      } else {
        dispatch({
          type: types.REQUEST_CURRENT_STOCK
        });

        getStockData(symbol, dispatch);
      }
    };
  }
};
