import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import {Link} from 'react-router';

export default function Playlist (props) {
  return (
    <div>
      <HeaderContainer />
      <h1>Playlist Successfully Posted!</h1>
      <p>Check it out <a target="_blank" rel="noopener noreferrer" href={`https://play.spotify.com/user/${props.currentUser.spotifyProfile.id}/playlist/${props.currentUser.spotifyProfile.id}`}>here</a></p>
      <Link to={'/'}><button>Start Over!</button></Link>
    </div>);
}
