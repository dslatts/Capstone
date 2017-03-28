import { combineReducers } from 'redux';
import playlistReducer from './playlist';
import albumReducer from './album';
import songsReducer from './songs';
import userReducer from './user';

const rootReducer = combineReducers({
  currentAlbumList: albumReducer,
  currentSongList: songsReducer,
  currentUser: userReducer,
  playlists: playlistReducer
});

export default rootReducer;
