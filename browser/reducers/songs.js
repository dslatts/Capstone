import {GET_SONGS, REMOVE_SONGS, REMOVE_ALL} from '../actions/songs';

const initialState = {
  songList: []
}
const songsReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {

    case GET_SONGS:
      newState.songList.push(action.receivedSong);
      return newState;

    case REMOVE_SONGS:
      newState.songList = newState.songList.filter((song) => song !== action.songToRemove);
      return newState;

    case REMOVE_ALL:
      newState.songList = [];
      return newState;

    default:
      return state;
  }
};

export default songsReducer;
