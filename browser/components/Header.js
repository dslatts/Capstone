import React, {Component} from 'react';
import {Link} from 'react-router';
export default class Header extends Component {
  constructor(props){
    super(props);
    this.isLoggedIn = false;
    this.renderLoginButton = this.renderLoginButton.bind(this);
  }

  //conditional rendering of login/logout button
  renderLoginButton(){
    if (this.props.currentUser[3]){
      this.isLoggedIn = true;
      return (<button onClick={this.props.logout} id="Logout">Log Out</button>);
    }
    else {
      this.isLoggedIn = false;
      return (<a href={'/api/auth/spotify'}><button id="Login">Log In</button></a>);
    }
  }
  render(){
    return (
      <div>
        <nav id="header">
          <h1 id="appLogo">Spoti-Cry</h1>
          {this.renderLoginButton()}
          {this.isLoggedIn ?
            <Link to={`/${this.props.currentUser[3].id}/profile`}><img id="profilePic" src={this.props.currentUser[3].images[0].url} /></Link>
            : null}
        </nav>
      </div>
    );
  }

  }
