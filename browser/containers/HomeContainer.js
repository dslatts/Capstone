import HomePage from '../components/HomePage';
import { connect } from 'react-redux';
import {fetchAlbums, removeAlbums} from '../actions/album';
import {getSongs, removeSongs, removeAll} from '../actions/songs';

const mapStateToProps = (state) => {
  return {
    currentAlbumList: state.currentAlbumList,
    currentUser: state.currentUser,
    currentSongList: state.currentSongList.songList,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAlbums: function(artist){
      dispatch(fetchAlbums(artist));
    },
    getSongs: function(songs){
      dispatch(getSongs(songs));
    },
    removeSongs: function(songs){
      dispatch(removeSongs(songs));
    },
    removeAll: function(){
      dispatch(removeAll());
    },
    removeAlbums: function(){
      dispatch(removeAlbums());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
