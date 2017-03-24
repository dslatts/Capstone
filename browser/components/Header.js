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

  function signedIn(){
    if(props.currentUser[3]){
      return (<li><Link to={`/${props.currentUser[3].id}/profile`}>Profile</Link></li>)
    }
  }

  return (
    <div>
      <nav id="header">
        <h1 id="appLogo">Spoti-Cry</h1>
        <ul>
          <li><img id="headerImg" src={profilePicture(props.currentUser[3].images[0])} />
            <ul className="subMenu">
              {signedIn()}
              <li onClick={props.logout}><Link to={'/'}>Log Out</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
