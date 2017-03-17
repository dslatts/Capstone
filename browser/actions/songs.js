import axios from 'axios';

export const GET_SONGS = 'GET_SONGS';
export const REMOVE_SONGS = 'REMOVE_SONGS';

export const getSongs = (songs) => ({ type: GET_SONGS, receivedSongs: songs});
export const removeSongs = (songs) => ({ type: REMOVE_SONGS, songsToDelete: songs});

//thunk action creators
export const fetchSongs = () => {
    return (dispatch) => {
        axios.get()
        .then((res) => res.data)
        .then((songs) => {
            dispatch(getSongs(songs));
        })
        .catch(function (err) {
            console.error(err);
        });
    };
};
