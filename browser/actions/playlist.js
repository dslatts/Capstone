import axios from 'axios';

export const GET_PLAYLIST = 'GET_ARTISTS';

export const getPlaylist = (playist) => ({ type: GET_PLAYLIST, receivedPlaylist: playist});

//thunk action creators
// export const fetchArtists = () => {
//     return (dispatch) => {
//         axios.get()
//         .then((res) => res.data)
//         .then((artists) => {
//             dispatch(getArtists(artists));
//         })
//         .catch(function (err) {
//             console.error(err);
//         });
//     };
// };
