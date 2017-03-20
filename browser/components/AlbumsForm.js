import React, {Component} from 'react';

export default class AlbumsForm extends Component {
constructor(props){
  super(props);
  this.selectedAlbums = {};
  this.onAlbumsSubmit = this.onAlbumsSubmit.bind(this);
  this.onAlbumToggle = this.onAlbumToggle.bind(this);
}

onAlbumsSubmit(event){
  event.preventDefault();
  console.log(this.state.inputValue);
}

onAlbumToggle(event){
  event.preventDefault();
  this.setState({
    [event.target.name]: event.target.checked
  });
  console.log(this.state);
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
      <form onSubmit={this.onAlbumsSubmit}>
        {albumList && albumList.map((album) => {
        return (<div key={album.id}>
            <input
              type="checkbox"
              name={album.id}
              onChange={this.onAlbumToggle}
              checked={this.state[album.id]}
              value={album.id} />
              <img src={album.images[0].url} />
              {album.name}
            </div>
        );
      })}
        <button>Visualize</button>
      </form>
    </div>);
  }
}
