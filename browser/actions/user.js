import axios from 'axios';
import {setFalse} from './loading';

export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_PLAYLISTS = 'UPDATE_PLAYLISTS';

export const setUser = (user) => ({ type: SET_USER, currentUser: user});
export const removeUser = () => ({ type: REMOVE_USER});
export const updatePlaylists = (playlists) => ({type: UPDATE_PLAYLISTS, playlists: playlists});

//thunk action creators
export const fetchUser = () => {
  return (dispatch) => {
    axios.get('/api/users/profile')
      .then((res) => res.data)
      .then((user) => {
        dispatch(setUser(user));
      })
      .then(() => {
        dispatch(setFalse());})
      .catch(function (err) {
        console.error(err);
      });
    };
};

export const logout = () => {
  return (dispatch) => {
    axios.get('/api/auth/logout')
      .then(() => {
        dispatch(removeUser());
      })
      .catch(function(err) {
        console.error(err);
      });
  };
};

export const fetchPlaylist = () => {
  return (dispatch) => {
    axios.get('/api/users/profile')
      .then((res) => res.data)
      .then((user) => {
        dispatch(setUser(user));
        return axios.get('/api/playlists');
      })
      .then((res) => {
        return res.data;
      })
      .then(playlists => {
        dispatch(updatePlaylists(playlists));
        dispatch(setFalse());
      })
      .catch(function (err) {
        console.error(err);
      });
    // axios.get('/api/users/profile')
    //     axios.get('/api/playlists')
    //     .then((res) => res.data)
    //     .then((playlists) => {
    //       dispatch(updatePlaylists(playlists));
    //     })
    //     .catch(function (err) {
    //     console.error(err);
    //   });
  };
};
