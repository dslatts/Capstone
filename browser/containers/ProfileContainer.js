import Profile from '../components/Profile';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(Profile);
