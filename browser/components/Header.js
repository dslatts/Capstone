import React, {Component} from 'react';

export default class Header extends Component {
  constructor(props){
    super(props);
    this.renderLoginButton = this.renderLoginButton.bind(this);
  }

  //conditional renderinf of login/logout button
  renderLoginButton(){
    if (this.props.currentUser.passport){
      return (<button onClick={this.props.logout} id="Logout">Log Out</button>);
    }
    else {
      return (<a href={'/api/auth/spotify'}><button id="Login">Log In</button></a>);
    }
  }
  render(){
    return (
      <div>
        <nav id="header">
          <h1 id="appLogo">Spoti-Cry</h1>
          {this.renderLoginButton()}
        </nav>
      </div>
    );
  }

  }
