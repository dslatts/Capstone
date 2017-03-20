import React, {Component} from 'react';
import ArtistsForm from './ArtistsForm';
import AlbumsForm from './AlbumsForm';

export default class HomePage extends Component {
constructor(){
  super();
}
  render () {
    return (
    <div>
      <ArtistsForm />
      <AlbumsForm albumList={this.props.currentAlbumList} />
    </div>);
  }
}
