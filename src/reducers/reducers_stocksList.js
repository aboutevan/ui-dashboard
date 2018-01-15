import axios from 'axios';

const baseUrl = 'https://api.iextrading.com/1.0';

const url = `${baseUrl}/ref-data/symbols`;

export const types = {
  REQUEST_STOCK_LIST: 'REQUEST_STOCK_LIST',
  RECEIVE_STOCK_LIST: 'RECEIVE_STOCK_LIST',
  RESET_DATA: 'RESET_DATA'
};

export const initialState = {
  isFetching: false,
  didReset: false,
  entities: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_STOCK_LIST:
      console.log(action.type);
      return Object.assign({}, state, {
        isFetching: true,
        didReset: false
      });

    case types.RECEIVE_STOCK_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        didReset: false,
        entities: action.data
      });

    default:
      return state;
  }
};

const receiveData = data => {
  return {
    type: types.RECEIVE_STOCK_LIST,
    data
  };
};

export const actions = {
  requestData: () => {
    return dispatch => {
      dispatch({
        type: types.REQUEST_STOCK_LIST
      });

      return axios.get(url).then(response => {
        dispatch(receiveData(response.data));
      });
    };
  }
};
