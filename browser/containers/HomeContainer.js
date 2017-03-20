import HomePage from '../components/HomePage';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {
    currentAlbumList: state.currentAlbumList
  }
};

export default connect(null)(HomePage);
