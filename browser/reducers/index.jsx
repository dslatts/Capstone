import { combineReducers } from 'redux';
import artistReducer from './artist';
import albumReducer from './album';
import songsReducer from './songs';

const rootReducer = combineReducers({
  currentArtist: artistReducer,
  currentAlbumList: albumReducer,
  currentSongList: songsReducer
});

export default rootReducer;
