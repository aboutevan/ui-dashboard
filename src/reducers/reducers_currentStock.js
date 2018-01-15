import axios from 'axios';

const baseUrl = 'https://api.iextrading.com/1.0';
const logoUrl = `${baseUrl}/price/`;

export const types = {
  SET_CURRENT_STOCK: 'SET_CURRENT_STOCK',
  GET_CURRENT_STOCK: 'GET_CURRENT_STOCK',
  REQUEST_CURRENT_STOCK: 'REQUEST_CURRENT_STOCK'
};

export const intialState = {
  currentStock: null,
  cachedEntities: []
};

export default (state = intialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_STOCK:
      // check if exists
      let stockCached = state.cachedEntities.indexOf(action.stock.symbol) > -1;

      // copy the existing array
      let cachedCopy = state.cachedEntities.slice();

      if (!stockCached) {
        cachedCopy.push(action.stock);
      }

      return Object.assign({}, state, {
        currentStock: action.stock,
        cachedEntities: cachedCopy
      });

    case types.REQUEST_CURRENT_STOCK:
      return {
        ...state,
        isFetchingStock: true
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
  console.log('requst');
  const slugToLowerCase = slug;

  return axios
    .get(`${baseUrl}/stock/${slugToLowerCase}/price/`)
    .then(response => {
      console.log(response.data);
    });
};

export const actions = {
  setCurrentStock: stock => {
    return setCurrentStock(stock);
  },

  requestCurrentStock: symbol => {
    return (dispatch, getState) => {
      const cachedEntities = getState().currentStock.cachedEntities;
      console.log(symbol);
      if (cachedEntities.indexOf(symbol) > -1) {
        console.log(cachedEntities[cachedEntities.indexOf(symbol)]);
        return;
      }
      requestCurrentStock(symbol);
    };
  }
};
