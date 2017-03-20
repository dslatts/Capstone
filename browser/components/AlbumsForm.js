import React, {Component} from 'react';

export default class AlbumsForm extends Component {
constructor(props){
  super(props);
  this.onAlbumsSubmit = this.onAlbumsSubmit.bind(this);
}

onAlbumsSubmit(event){
  event.preventDefault();
  console.log(this.state.inputValue);
}
  render () {
    let albumList;
    if (this.props.currentAlbumList.albums) albumList = this.props.currentAlbumList.albums.items;

    return (
    <div>
      <form onSubmit={this.onAlbumsSubmit}>
        {albumList && albumList.map((album) => {
          return <p key={album.id} >{album.name}</p>;
        })}
        <button>Visualize</button>
      </form>
    </div>);
  }
}
