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
    this.checkStatus = this.checkStatus.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
    this.onCompareClick = this.onCompareClick.bind(this);
    this.determineComponents = this.determineComponents.bind(this);
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
      return (<Create />);
    }
    else if (this.state.createOrCompare === 'compare'){
      return (
        <Compare
        fetchAlbums={this.props.fetchAlbums}
        getSongs={this.props.getSongs}
        removeSongs={this.props.removeSongs}
        removeAll={this.props.removeAll}
        currentSongList={this.props.currentSongList}
        currentAlbumList={this.props.currentAlbumList} />);
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
      <a href={'/api/auth/spotify'}><button id="Login">Log In</button></a>
      :
      this.determineComponents()
    }
    </div>);
  }
}
