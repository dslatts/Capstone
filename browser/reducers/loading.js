import {SET_TRUE, SET_FALSE} from '../actions/loading';

const loadingReducer = (state = true, action) => {

  let newState = state;

  switch (action.type) {
    case SET_TRUE:
      newState = true;
      return newState;

    case SET_FALSE:
      newState = false;
      return newState;

    default:
      return state;
  }
};

export default loadingReducer;
