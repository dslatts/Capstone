import React from 'react';
import {Link} from 'react-router';

export default function Header(props) {
    return (
      <div>
        <nav id="header">
          <h1 id="appLogo">Spoti-Cry</h1>
          <button onClick={props.logout} id="Logout">Log Out</button>
          <Link to={`/${props.currentUser[3].id}/profile`}><img id="profilePic" src={props.currentUser[3].images[0].url} /></Link>
        </nav>
      </div>
    );
  }
