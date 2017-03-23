import {SET_USER, REMOVE_USER} from '../actions/user';

const songsReducer = (state = {}, action) => {

  switch (action.type) {
    case SET_USER:
      return action.currentUser;

    case REMOVE_USER:
      return {};

    default:
      return state;
  }
};

export default songsReducer;
