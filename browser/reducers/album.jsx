import {GET_ALBUMS, REMOVE_ALBUMS} from '../actions/album';

const albumReducer = (state = {}, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_ALBUMS:
      newState.currentAlbumList = action.receivedAlbums;
      break;

    case REMOVE_ALBUMS:
      newState.currentAlbumList = {};
      break;

    default:
      return state;
  }
  return newState;
};

export default albumReducer;
