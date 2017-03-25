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

  signedInImg(){
    if (this.props.currentUser[3]){
      return (<img id="profilePic" src={profilePicture(this.props.currentUser[3].images[0])} />)
    }
  }

  signedInName(){
    if (this.props.currentUser[3]){
      return (<p>{this.props.currentUser[3].display_name}</p>)
    }
  }

  render () {
    return (
      <div>
        <HeaderContainer />
        {this.signedInImg()}
        {this.signedInName()}
        {/*(this.props.currentUser) ?  : null}
        {(this.props.currentUser) ?  : null*/}
      </div>
    );
  }
}
