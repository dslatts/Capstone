import Profile from '../components/Profile';
import { connect } from 'react-redux';
import {fetchPlaylist} from '../actions/playlist';

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    playlists: state.playlists
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlaylist: function(playlistId){
      dispatch(fetchPlaylist(playlistId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
