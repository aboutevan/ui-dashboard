export const types = {
  INCREMENT_REQUESTED: 'counter/INCREMENT_REQUESTED',
  INCREMENT: 'counter/INCREMENT',
  DECREMENT_REQUESTED: 'counter/DECREMENT_REQUESTED',
  DECREMENT: 'counter/DECREMENT',
};

export const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false
};


export default (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      };

    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      };

    case types.DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      };

    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      };

    default:
      return state;
  }
}

export const actions = {

  increment: () => {
    return dispatch => {
      dispatch({
        type: types.INCREMENT_REQUESTED
      })

      dispatch({
        type: types.INCREMENT
      })
    }
  },

  incrementAsync: () => {
    return dispatch => {
      dispatch({
        type: types.INCREMENT_REQUESTED
      })

      return setTimeout(() => {
        dispatch({
          type: types.INCREMENT
        })
      }, 3000)
    }
  },

  decrement: () => {
    return dispatch => {
      dispatch({
        type: types.DECREMENT_REQUESTED
      })

      dispatch({
        type: types.DECREMENT
      })
    }
  },

  decrementAsync: () => {
    return dispatch => {
      dispatch({
        type: types.DECREMENT_REQUESTED
      })

      return setTimeout(() => {
        dispatch({
          type: types.DECREMENT
        })
      }, 3000)
    }
  }

};
