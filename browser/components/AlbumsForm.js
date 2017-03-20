import React, {Component} from 'react';

export default class AlbumsForm extends Component {
constructor(props){
  super(props);
  this.state = {
    indexSelected: ''
  }
  this.onAlbumsSubmit = this.onAlbumsSubmit.bind(this);
  this.onAlbumToggle = this.onAlbumToggle.bind(this);
}

onAlbumsSubmit(event){
  event.preventDefault();
}

onAlbumToggle(event){

  const value = event.target.value
  this.setState({
    indexSelected: value
  })
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
        {albumList && albumList.map((album, index) => {
          console.log('ALBUM ID::::::::', album.id)
        return (<div key={album.id}>
            <input
              type="checkbox"
              name={album.id}
              onChange={this.onAlbumToggle}
              checked={this.state.indexSelected === album.id }
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
