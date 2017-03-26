import React from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import {Link} from 'react-router';

export default function Playlist (props) {
  return (
    <div>
      <HeaderContainer />
      <h1>Playlist Successfully Posted!</h1>
      <p>Check it out <a href={`https://play.spotify.com/user/${props.currentUser[3].id}/playlist/${props.currentUser[2][0][0].spotifyId}`}>here</a></p>
      <Link to={'/'}><button>Start Over!</button></Link>
    </div>);
}
