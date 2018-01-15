import axios from 'axios';

const apiKey = 'AHT15VI6PBK5AF7Ai';

const baseUrl = 'https://api.iextrading.com/1.0';

// const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=CNY&apikey=${apiKey}/`;
const url = `${baseUrl}/ref-data/symbols`;

export const types = {
  REQUEST_DATA: 'REQUEST_DATA',
  RECEIVE_DATA: 'RECEIVE_DATA',
  RESET_DATA: 'RESET_DATA',
};

export const initialState = {
  isFetching: false,
  didReset: false,
  entities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        didReset: false,
      });

    case types.RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        didReset: false,
        entities: action.data
      });

    default:
      return state;
  }
}

const receiveData = data => {
  return {
    type: types.RECEIVE_DATA,
    data
  }
}

export const actions = {

  requestData:  () => {
    return dispatch => {
      
      dispatch({
        type: types.REQUEST_DATA,
      })

      return axios.get(url)
        .then(response => {
          dispatch(receiveData(response.data));
        });
    }
  }
}