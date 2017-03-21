import axios from 'axios';

export const GET_SONGS = 'GET_SONGS';
export const REMOVE_SONGS = 'REMOVE_SONGS';

export const getSongs = (songs) => ({ type: GET_SONGS, receivedSongs: songs});
export const removeSongs = () => ({ type: REMOVE_SONGS});

//thunk action creators
export const fetchSongsOfAlbum = (albumId) => {
    return (dispatch) => {
        axios.get(`api/albums/${albumId}`)
        .then((res) => res.data)
        .then((album) => {
            dispatch(getSongs(album.tracks.items));
        })
        .catch(function (err) {
            console.error(err);
        });
    };
};
