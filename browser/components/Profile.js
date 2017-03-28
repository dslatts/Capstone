import React, {Component} from 'react';
import HeaderContainer from '../containers/HeaderContainer';
// import Visualone from './Visualone';
import Visualtwo from './Visualtwo';
import History from './History';
import sunburst from '../datavis/Sunburst.js';
import dataVisual from '../datavis/DataVisual.js';
import UserPlaylist from './UserPlaylist';
import RdrChart from '../datavis/radarChart.js';
import AreaChart from '../datavis/AreaChart.js';


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
    console.log(this.props.currentUser);
    if (this.props.currentUser.spotifyProfile){
      console.log('in img');
      return (<img id="profilePic" src={profilePicture(this.props.currentUser.spotifyProfile.images[0])} />);
    }
  }

  signedInName(){
    console.log(this.props.currentUser);
    if (this.props.currentUser.spotifyProfile){
      console.log('in name');
      return (<p>{this.props.currentUser.spotifyProfile.display_name}</p>);
    }
  }

  render () {
    console.log(this.props.currentUser.playlists && this.props.currentUser.playlists.map((obj) => obj[0]));
    return (
      <div>
        <HeaderContainer />
        {this.signedInImg()}
        {this.signedInName()}
        <div>
        {this.props.currentUser.playlists && this.props.currentUser.playlists.map((playlist) => {
          return (<UserPlaylist key={playlist[0].spotifyId} playlist={playlist[0]} />);
        })}
          {/*should place profile elements here*/}
          {/*<RdrChart currentUser={this.props.currentUser} />*/}
          {/*<AreaChart currentUser={this.props.currentUser} />*/}
        </div>
      </div>
    );
  }
}
