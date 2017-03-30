import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import {Link} from 'react-router';

export default function Playlist (props) {
  var playlistURL = '';
  if (props.currentUser.playlists){
    playlistURL = `https://play.spotify.com/user/${props.currentUser.spotifyProfile.id}/playlist/${props.currentUser.playlists[0][0].spotifyId}`;
  }
  else {
    playlistURL = `https://play.spotify.com/user/${props.currentUser.spotifyProfile.id}`;
  }
  return (
    <div>
      <HeaderContainer />
      <div id="playlistSuccess">
        <h1>Playlist Successfully Posted!</h1>
        <p>Check it out <a target="_blank" rel="noopener noreferrer" href={playlistURL}>here</a></p>
        <br />
        <Link to={'/'}><button className="submitSelection">Start Over!</button></Link>
      </div>
    </div>);
}
