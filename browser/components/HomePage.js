import React, {Component} from 'react';
import Create from './Create';
import Compare from './Compare';
import HeaderContainer from '../containers/HeaderContainer';
import Sidebar from './Sidebar';

export default class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      createOrCompare: ''
    };
    this.isLoggedIn = false;
    this.goBack = this.goBack.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
    this.onCompareClick = this.onCompareClick.bind(this);
    this.determineComponents = this.determineComponents.bind(this);
  }
  goBack(){
    this.setState({
      createOrCompare: ''
    });
  }
  checkStatus(){
    if (this.props.currentUser[3]){
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }
  determineComponents(){
    if (this.state.createOrCompare === ''){
      return (
        <div>
        <HeaderContainer />
        <button onClick={this.onCreateClick}>Create Playlist</button>
        <button onClick={this.onCompareClick}>Compare Music</button>
        </div>
      );
    }
    else if (this.state.createOrCompare === 'create'){
      return (
        <div className="userSelection">
          <Create
            goBack={this.goBack}
            fetchAlbums={this.props.fetchAlbums}
            getSongs={this.props.getSongs}
            removeSongs={this.props.removeSongs}
            removeAll={this.props.removeAll}
            currentSongList={this.props.currentSongList}
            currentAlbumList={this.props.currentAlbumList}
            />
        </div>
      );
    }
    else if (this.state.createOrCompare === 'compare'){
      return (
        <div className="userSelection">
          <Compare
            goBack={this.goBack}
            fetchAlbums={this.props.fetchAlbums}
            getSongs={this.props.getSongs}
            removeSongs={this.props.removeSongs}
            removeAll={this.props.removeAll}
            currentSongList={this.props.currentSongList}
            currentAlbumList={this.props.currentAlbumList}
            />
        </div>
      );
    }
  }

  onCreateClick(){
    this.setState({createOrCompare: 'create'});
  }
  onCompareClick(){
    this.setState({createOrCompare: 'compare'});
  }

  render () {
    this.checkStatus();
    return (
    <div>
      {!this.isLoggedIn ?
        <div id="loginMessage">
          <h1>Welcome to [INSERT APP NAME]</h1>
          <h4>Please connect to your Spotify to use [INSERT APP NAME]</h4>
          <a href={'/api/auth/spotify'}><button id="loginButton">Log In</button></a>
        </div>
        : this.determineComponents()
      }
    </div>);
  }
}
