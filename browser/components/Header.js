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
    if (props.currentUser.spotifyProfile){
      return (<li><Link className='menuLinks' to={`/${props.currentUser.spotifyProfile.id}/profile`}>Profile</Link></li>)
    }
  }

  function signedInImg(){
    if(props.currentUser.spotifyProfile.images){
      return (
        <div className="UserImgDropdown">
          <img id="headerImg" src={profilePicture(props.currentUser.spotifyProfile.images[0])} />
          <ul className="subMenu">
            {signedIn()}
            {/*NOTE used setTimeout */}
            <li onClick={() => setTimeout(props.logout, 500)}><Link className='menuLinks' to={'/'}>Log Out</Link></li>
          </ul>
        </div>
      )
    }
  }

  return (
    <div className="header">
      <nav id="header">
        <Link to={'/'}><h1 id="appLogo">attitune</h1></Link>
        <div>
          {signedInImg()}
        </div>
      </nav>
    </div>
  );
}
