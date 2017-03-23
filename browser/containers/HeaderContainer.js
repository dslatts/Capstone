import Header from '../components/Header';
import { connect } from 'react-redux';
import {logout} from '../actions/user';

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: function(){
      logout();
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
