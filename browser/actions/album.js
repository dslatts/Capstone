import axios from 'axios';

export const GET_ALBUMS = 'GET_ALBUMS';
export const REMOVE_ALBUMS = 'REMOVE_ALBUMS';

export const getAlbums = (albums) => ({ type: GET_ALBUMS, receivedAlbums: albums});
export const removeAlbums = (albums) => ({ type: REMOVE_ALBUMS, albumsToDelete: albums});

//thunk action creators
export const fetchAlbums = () => {
    return (dispatch) => {
        axios.get()
        .then((res) => res.data)
        .then((albums) => {
            dispatch(getAlbums(albums));
        })
        .catch(function (err) {
            console.error(err);
        });
    };
};
