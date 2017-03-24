import React from 'react';
import {Link} from 'react-router';

export default function Header(props) {
  var profilePicture = function(img){
    if (img) {
      return img.url;
    } else {
      return '/images/anon_Icon.png';
    }
  };

  return (
    <div>
      <nav id="header">
        <h1 id="appLogo">Spoti-Cry</h1>
        <button onClick={props.logout} id="logout">Log Out</button>
        <Link to={`/${props.currentUser[3].id}/profile`}><img id="headerImg" src={profilePicture(props.currentUser[3].images[0])} /></Link>
      </nav>
    </div>
  );
}
