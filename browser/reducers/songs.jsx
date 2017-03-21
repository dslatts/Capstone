import {GET_SONGS, REMOVE_SONGS} from '../actions/songs';

const songsReducer = (state = {}, action) => {

  switch (action.type) {
    case GET_SONGS:
      return action.receivedSongs;

    case REMOVE_SONGS:
      return {};

    default:
      return state;
  }
};

export default songsReducer;
