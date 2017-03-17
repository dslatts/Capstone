import axios from 'axios';

export const GET_ARTISTS = 'GET_ARTISTS';
export const REMOVE_ARTIST = 'REMOVE_ARTIST';

export const getArtists = (artists) => ({ type: GET_ARTISTS, receivedArtists: artists});
export const removeArtist = () => ({ type: REMOVE_ARTIST});

//thunk action creators
export const fetchArtists = () => {
    return (dispatch) => {
        axios.get()
        .then((res) => res.data)
        .then((artists) => {
            dispatch(getArtists(artists));
        })
        .catch(function (err) {
            console.error(err);
        });
    };
};
