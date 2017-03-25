import React, {Component} from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import Visualone from './Visualone';
import Visualtwo from './Visualtwo';
import History from './History';

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
    this.signedInImg = this.signedInImg.bind(this);
    this.signedInName = this.signedInName.bind(this);
  }

  signedInImg(){
    if (this.props.currentUser[3]){
      return (<img id="profilePic" src={profilePicture(this.props.currentUser[3].images[0])} />);
    }
  }

  signedInName(){
    if (this.props.currentUser[3]){
      return (<p>{this.props.currentUser[3].display_name}</p>);
    }
  }

  render () {
    return (
      <div>
        <HeaderContainer />
        {this.signedInImg()}
        {this.signedInName()}
        <Visualone />
        <div>
          <Visualtwo />
          <History userHistory={this.props.currentUser[5].items} />
          <Visualtwo />
        </div>
      </div>
    );
  }
}
