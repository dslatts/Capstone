import HomePage from '../components/HomePage';
import { connect } from 'react-redux';
import {fetchAlbums} from '../actions/album';
import {fetchSongsOfAlbum} from '../actions/songs';

const mapStateToProps = (state) => {
  return {
    currentAlbumList: state.currentAlbumList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAlbums: function(artist){
      dispatch(fetchAlbums(artist));
    },
    fetchSongsOfAlbum: function(albumId){
      dispatch(fetchSongsOfAlbum(albumId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
