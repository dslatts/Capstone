import React, {Component} from 'react';
import SongsForm from './SongsForm';

export default class AlbumsForm extends Component {
constructor(props){
  super(props);
  this.state = {
    indexSelected: [],
    selectedAlbum: ''
  };
  this.onAlbumsSubmit = this.onAlbumsSubmit.bind(this);
  this.onAlbumToggle = this.onAlbumToggle.bind(this);
  this.onImageClick = this.onImageClick.bind(this);
}

onAlbumsSubmit(event){
  event.preventDefault();
  //dispatch goes here
}

onAlbumToggle(event){
  let albums;
  const value = event.target.value;

  if (this.state.indexSelected.indexOf(value) > -1) {
    albums = this.state.indexSelected.filter(id => id !== value);
  } else {
    albums = [...this.state.indexSelected, value];
  }
  this.setState({
    indexSelected: albums
  });
}
onImageClick(albumId){
  this.setState({selectedAlbum: albumId});
}
render () {
  let albumList;
  if (this.props.currentAlbumList.albums){
    albumList = this.props.currentAlbumList.albums.items.filter((album) => {
    return album.album_type === 'album';
    });
  }

    return (
    <div>
      <button>Select All</button>
      <form onSubmit={this.onAlbumsSubmit}>
        {albumList && albumList.map((album) => {
        return (<div key={album.id}>
            <input
              type="checkbox"
              name={album.id}
              onChange={this.onAlbumToggle}
              checked={this.state.indexSelected.indexOf(album.id) > -1}
              value={album.id} />
              <img src={album.images[0].url} onClick={() => this.onImageClick(album.id)} />
              {album.name}
              {album.id === this.state.selectedAlbum ? <SongsForm album={album.id} /> : null}
            </div>
        );
      })}
        <button>Visualize</button>
      </form>
    </div>);
  }
}
