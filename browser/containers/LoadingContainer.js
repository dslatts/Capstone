import Loading from '../components/Loading';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading
  };
};

export default connect(mapStateToProps)(Loading);
