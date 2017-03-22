import {GET_SONGS, REMOVE_SONGS} from '../actions/songs';

const songsReducer = (state = {}, action) => {

  switch (action.type) {
    //TO DO: add to array of songs on state
    case GET_SONGS:
      return action.receivedSongs;
    //TO DO: remove specified songs from array of songs (array.filter?)
    case REMOVE_SONGS:
      return {};

    default:
      return state;
  }
};

export default songsReducer;
