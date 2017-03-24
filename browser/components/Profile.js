import React, {Component} from 'react';
import HeaderContainer from '../containers/HeaderContainer';

 var profilePicture = function(img){
    if (img) {
      return img.url;
    } else {
      return '/images/anon_Icon.png';
    }
  };

export default class Profile extends Component {
constructor(props){
  super(props);
}
  render () {
    return (
    <div>
      <HeaderContainer />
      <img id="profilePic" src={profilePicture(this.props.currentUser[3].images[0])} />
      <p>{this.props.currentUser[3].display_name}</p>
    </div>);
  }
}
