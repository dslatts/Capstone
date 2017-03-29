import axios from 'axios';

export const GET_SONGS = 'GET_SONGS';
export const REMOVE_SONGS = 'REMOVE_SONGS';
export const REMOVE_ALL = 'REMOVE_ALL';

export const getSongs = (song) => ({ type: GET_SONGS, receivedSong: song});
export const removeSongs = (song) => ({ type: REMOVE_SONGS, songToRemove: song});
export const removeAll = () => ({type: REMOVE_ALL});

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


