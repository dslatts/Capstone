import {GET_ALBUMS, REMOVE_ALBUMS} from '../actions/album';

const albumReducer = (state = {}, action) => {

  switch (action.type) {
    case GET_ALBUMS:
      return action.receivedAlbums;

    case REMOVE_ALBUMS:
      return {};

    default:
      return state;
  }
};

export default albumReducer;
