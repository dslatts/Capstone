import React, {Component} from 'react';
import Create from './Create';
import Compare from './Compare';
import HeaderContainer from '../containers/HeaderContainer';

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
    if (this.props.currentUser.localProfile){
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
          <HeaderContainer goBack={this.goBack} />
          <div id="selectors" className="columns">
            <div className="column" onClick={this.onCreateClick}>
              <span className="icon is-large">
                <i className="fa fa-music" aria-hidden="true" />
              </span>
              <h2>Create Playlist</h2>
              <h5>Craft the perfect playlist to target whatever mood
              you want your listeners to feel, and post it to your Spotify</h5>
            </div>
            <div className="column" onClick={this.onCompareClick}>
              <span className="icon is-large">
                <i className="fa fa-area-chart" aria-hidden="true" />
              </span>
              <h2>Compare Music</h2>
              <h5>Pick your favorite songs and see how they compare by mood</h5>
            </div>
          </div>
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
            removeAlbums={this.props.removeAlbums}
            currentSongList={this.props.currentSongList}
            currentAlbumList={this.props.currentAlbumList}
            createOrCompare={this.state.createOrCompare}
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
            removeAlbums={this.props.removeAlbums}
            currentSongList={this.props.currentSongList}
            currentAlbumList={this.props.currentAlbumList}
            createOrCompare={this.state.createOrCompare}
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
          <h1>Welcome to Attitune</h1>
          <h4>Please connect to your Spotify to use our service</h4>
          <a href={'/api/auth/spotify'}><button id="loginButton"><i className="fa fa-spotify" aria-hidden="true" />  Log In</button></a>
        </div>
        : this.determineComponents()
      }
    </div>);
  }
}
