import {GET_ARTISTS, REMOVE_ARTIST} from '../actions/artist';

const artistReducer = (state = {}, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_ARTISTS:
      newState.currentArtist = action.receivedArtists;
      break;

    case REMOVE_ARTIST:
      newState.currentArtist = {};
      break;

    default:
      return state;
  }
  return newState;
};

export default artistReducer;
