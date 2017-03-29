import {SET_USER, REMOVE_USER, UPDATE_PLAYLISTS} from '../actions/user';

const songsReducer = (state = {}, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_USER:
      return action.currentUser;

    case REMOVE_USER:
      return {};

    case UPDATE_PLAYLISTS:
      newState.playlists = action.playlists;
      return newState;

    default:
      return state;
  }
};

export default songsReducer;
