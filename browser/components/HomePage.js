import React, {Component} from 'react';
import ArtistsForm from './ArtistsForm';
import AlbumsForm from './AlbumsForm';

export default class HomePage extends Component {
  render () {
    return (
    <div>
      <ArtistsForm fetchAlbums={this.props.fetchAlbums} />
      {this.props.currentAlbumList.albums ? <AlbumsForm currentAlbumList={this.props.currentAlbumList} /> : null}
    </div>);
  }
}
