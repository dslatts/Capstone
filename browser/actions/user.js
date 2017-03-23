import axios from 'axios';

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVER_USER';

export const setUser = (user) => ({ type: SET_USER, currentUser: user});
export const removeUser = () => ({ type: REMOVE_USER});

//thunk action creators
export const fetchUser = () => {
  return (dispatch) => {
    axios.get('/api/users/profile')
      .then((res) => res.data)
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch(function (err) {
        console.error(err);
      });
    };
};

export const logout = () => {
  return () => {
    axios.get('/api/auth/logout')
      .catch(function(err) {
        console.error(err);
      });
  };
};
