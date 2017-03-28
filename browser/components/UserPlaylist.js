import React from 'react';

export default function Playlist (props) {
  return (
    <div className="playlistTable" onClick={() => props.loadPlaylist(props.playlist.spotifyId)}>
      <h1>{props.playlist.title}</h1>
    </div>);
}

