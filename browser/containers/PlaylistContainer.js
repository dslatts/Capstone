import Playlist from '../components/Playlist';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(Playlist);
