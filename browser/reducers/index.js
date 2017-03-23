import { combineReducers } from 'redux';
import artistReducer from './artist';
import albumReducer from './album';
import songsReducer from './songs';
import userReducer from './user';

const rootReducer = combineReducers({
  currentArtist: artistReducer,
  currentAlbumList: albumReducer,
  currentSongList: songsReducer,
  currentUser: userReducer
});

export default rootReducer;
