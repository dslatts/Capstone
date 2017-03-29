import React, {Component} from 'react';
import HeaderContainer from '../containers/HeaderContainer';
// import Visualone from './Visualone';
// import Visualtwo from './Visualtwo';
// import History from './History';
// import sunburst from '../datavis/Sunburst.js';
// import dataVisual from '../datavis/DataVisual.js';
import UserPlaylist from './UserPlaylist';
import RdrChart from '../datavis/radarChart.js';
import AreaChart from '../datavis/AreaChart.js';
import PlaylistChart from '../datavis/playlistareachart.js';

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
    this.state = {
      selectedPlaylist: {}
    };
    this.signedInImg = this.signedInImg.bind(this);
    this.signedInName = this.signedInName.bind(this);
    this.loadPlaylist = this.loadPlaylist.bind(this);
  }

  componentWillReceiveProps(nextProps){
    //when playlist features loaded onto redux, add that to local state to render out graph
    let keyArr = Object.keys(nextProps.playlists);
    if (keyArr.length > 0){
      this.setState({
        selectedPlaylist: nextProps.playlists[keyArr[keyArr.length - 1]]
      });
    }

  }
  signedInImg(){
    if (this.props.currentUser.spotifyProfile){
      return (<img id="profilePic" src={profilePicture(this.props.currentUser.spotifyProfile.images[0])} />);
    }
  }

  signedInName(){
    if (this.props.currentUser.spotifyProfile){
      return (<p>{this.props.currentUser.spotifyProfile.display_name}</p>);
    }
  }

  loadPlaylist(playlistId){
    if (this.props.playlists[playlistId]){
      //IF PLAYLIST ALREADY LOADED ON STATE, CREATE GRAPH FROM IT
      this.setState({
        selectedPlaylist: this.props.playlists[playlistId]
      });
    }
    else {
      //IF NOT ON STATE, LOAD IT ON STATE, THEN CREATE GRAPH FROM IT
      this.props.fetchPlaylist(playlistId);
    }
  }

  render () {
    return (
      <div className="Profile">
      <div className = "ProfileHeader">
        <HeaderContainer />
        </div>
        {this.signedInImg()}
        {this.signedInName()}
        <div>
        <AreaChart currentUser={this.props.currentUser} />
        </div>
        <div className="smallProfileCharts">
          <RdrChart currentUser={this.props.currentUser} />
          <div className="playlistsContainer">
            {this.props.currentUser.playlists && this.props.currentUser.playlists.map((playlist) => {
              return (<UserPlaylist className="playListInactive" key={playlist[0].spotifyId} playlist={playlist[0]} loadPlaylist={this.loadPlaylist} />);
            })}
          {/*should place profile elements here*/}
          </div>
          </div>
          <div className='PlaylistChart'>
          <PlaylistChart playlist={this.props.playlists} />
          </div>
        </div>
    );
  }
}
