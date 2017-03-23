import React, {Component} from 'react';
import ArtistsForm from './ArtistsForm';
import AlbumsForm from './AlbumsForm';
import HeaderContainer from '../containers/HeaderContainer';

export default class HomePage extends Component {
  render () {
    return (
    <div>
      <HeaderContainer />
      <ArtistsForm fetchAlbums={this.props.fetchAlbums} />
      {this.props.currentAlbumList.albums ?
        <AlbumsForm fetchSongsOfAlbum={this.props.fetchSongsOfAlbum} currentAlbumList={this.props.currentAlbumList} />
        : null}
    </div>);
  }
}
