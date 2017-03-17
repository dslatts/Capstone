import {GET_SONGS, REMOVE_SONGS} from '../actions/songs';

const songsReducer = (state = {}, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_SONGS:
      newState.currentSongList = action.receivedSongs;
      break;

    case REMOVE_SONGS:
      newState.currentSongList = {};
      break;

    default:
      return state;
  }
  return newState;
};

export default songsReducer;
