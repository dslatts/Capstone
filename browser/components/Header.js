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
    if (props.currentUser[3]){
      return (<li><Link className='menuLinks' to={`/${props.currentUser[3].id}/profile`}>Profile</Link></li>)
    }
  }

  function signedInImg(){
    if(props.currentUser[3]){
      return (
        <div className="UserImgDropdown">
          <img id="headerImg" src={profilePicture(props.currentUser[3].images[0])} />
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
        <Link to={'/'}><h1 id="appLogo">Spoti-Cry</h1></Link>
        <div>
          {signedInImg()}
        </div>
      </nav>
    </div>
  );
}
