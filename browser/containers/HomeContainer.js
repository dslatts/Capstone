import HomePage from '../components/HomePage';
import { connect } from 'react-redux';
import {fetchAlbums} from '../actions/album';
import {getSongs, removeSongs, removeAll} from '../actions/songs';

const mapStateToProps = (state) => {
  return {
    currentAlbumList: state.currentAlbumList,
    currentUser: state.currentUser,
    currentSongList: state.currentSongList.songList
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
