export const types = {
  INCREMENT_REQUESTED: 'counter/INCREMENT_REQUESTED',
  INCREMENT: 'counter/INCREMENT',
  DECREMENT_REQUESTED: 'counter/DECREMENT_REQUESTED',
  DECREMENT: 'counter/DECREMENT'
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
};

export const actions = {
  increment: foo => {
    // Thunk middleware handles action creators that return functions
    // It passes the dispatch method as an argument to the function
    // allowing it to dispatch actions itself

    return dispatch => {
      // first dispatch: the app state is updated
      // to be aware the API call is starting

      // this action type could be defined elsewhere
      dispatch({
        type: types.INCREMENT_REQUESTED
      });

      dispatch({
        type: types.INCREMENT
      });
    };
  },

  incrementAsync: () => {
    return dispatch => {
      dispatch({
        type: types.INCREMENT_REQUESTED
      });

      // could be async call
      // return fetch('reddit.com/api')
      //  .then(
      //    response => response.json(),
      //    // DO NOT USE CATCH
      //    error => console.log(error)
      //  )
      //  .then(json =>
      //  // CAN DISPATCH HERE MANY TIMES
      //  update the app with results of API call
      //
      //  dispatch(actionToCallAfterApi())
      //  )

      return setTimeout(() => {
        dispatch({
          type: types.INCREMENT
        });
      }, 3000);
    };
  },

  decrement: () => {
    return dispatch => {
      dispatch({
        type: types.DECREMENT_REQUESTED
      });

      dispatch({
        type: types.DECREMENT
      });
    };
  },

  decrementAsync: () => {
    return dispatch => {
      dispatch({
        type: types.DECREMENT_REQUESTED
      });

      return setTimeout(() => {
        dispatch({
          type: types.DECREMENT
        });
      }, 3000);
    };
  }
};
