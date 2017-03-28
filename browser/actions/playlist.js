import axios from 'axios';

export const GET_PLAYLIST = 'GET_ARTISTS';

export const getPlaylist = (playistId, audioFeatures) => ({ type: GET_PLAYLIST, playlistId: playistId, audioFeatures: audioFeatures});

//thunk action creators
export const fetchPlaylist = (playlistId) => {
    return (dispatch) => {
        return axios.get(`/api/tracks/${playlistId}`)
        .then((res) => res.data)
        .then((playlist) => {
          //reduce playlistobj down to string of song id's
          var tracks = playlist.items.map((item) => item.track);
          var trackIds = tracks.map((track) => track.id).join(',');
          axios.get(`/api/tracks/audio-features?ids=${trackIds}`)
          .then((res) => res.data)
          .then((features) => {
            let feats = features.audio_features.map((audio, index) => {
                if (audio){
                    audio.track = tracks[index];
                    return audio;
                }
            });
            dispatch(getPlaylist(playlistId, feats));
          });
        })
        .catch(function (err) {
            console.error(err);
        });
    };
};
