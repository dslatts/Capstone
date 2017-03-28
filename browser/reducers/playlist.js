import {GET_PLAYLIST} from '../actions/playlist';

const playlistReducer = (state = {}, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_PLAYLIST:
      newState[action.playlistId] = action.audioFeatures;
      return newState;

    default:
      return state;
  }
};

export default playlistReducer;
