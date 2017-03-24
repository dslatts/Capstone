import React, {Component} from 'react';
import ArtistsForm from './ArtistsForm';
import AlbumsForm from './AlbumsForm';
import HeaderContainer from '../containers/HeaderContainer';
import Sidebar from './Sidebar';
import {Link} from 'react-router';

export default class Create extends Component {

  onAlbumsSubmit(event){
    event.preventDefault();
    console.log('inside create');
  }

  render () {
    return (
      <div>
        <HeaderContainer />
        <ArtistsForm fetchAlbums={this.props.fetchAlbums} />
        // TODO back button doesn't work yet. it's just a broken link. what we want to do here is refresh
        <button><Link to="/">BACK</Link></button>
        {this.props.currentAlbumList.albums ?
          <div>
            <Sidebar
              getSongs={this.props.getSongs}
              removeSongs={this.props.removeSongs}
              removeAll={this.props.removeAll}
              currentSongList={this.props.currentSongList}
              />
            <form onSubmit={this.onAlbumsSubmit}>
              <AlbumsForm
                currentAlbumList={this.props.currentAlbumList}
                getSongs={this.props.getSongs}
                removeSongs={this.props.removeSongs}
                removeAll={this.props.removeAll}
                currentSongList={this.props.currentSongList}
                />
              <button>Visualize</button>
              <button>Create Playlist</button>
            </form>
          </div>
          : null}
      </div>
  );}
}
