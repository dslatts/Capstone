import React, {Component} from 'react';
import ArtistsForm from './ArtistsForm';
import AlbumsForm from './AlbumsForm';

export default class HomePage extends Component {
constructor(props){
  super(props);
}
  render () {
    console.log(this.props);
    return (
    <div>
      <ArtistsForm fetchAlbums={this.props.fetchAlbums} />
      <AlbumsForm currentAlbumList={this.props.currentAlbumList} />
    </div>);
  }
}
