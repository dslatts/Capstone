import React, {Component} from 'react';
import SongsForm from './SongsForm';

export default class AlbumsForm extends Component {
constructor(props){
  super(props);
  this.state = {
    indexSelected: [],
    selectedSongs: {}
  };
  this.albumList = [];
  this.renderSelectToggle = this.renderSelectToggle.bind(this);
  this.selectToggle = this.selectToggle.bind(this);
  this.onAlbumsSubmit = this.onAlbumsSubmit.bind(this);
  this.onAlbumToggle = this.onAlbumToggle.bind(this);
  this.onSongClick = this.onSongClick.bind(this);
}

onAlbumsSubmit(event){
  event.preventDefault();
  //dispatch goes here
}

//changes button to say select all/deselect all
renderSelectToggle(){
  if (this.state.indexSelected.length < this.albumList.length){
    return (<button onClick={() => this.selectToggle(0)}>Select All</button>);
  }
  else {
    return (<button onClick={() => this.selectToggle(1)}>Deselect All</button>);
  }
}

selectToggle(decider){
  if (decider === 0){
    this.setState({
      indexSelected: [...this.albumList.map((album) => album.id)]
    });
  }
  else {
    this.setState({
      indexSelected: []
    });
  }
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

onSongClick(songId){
  var newState = this.state.selectedSongs;
  if (this.state.selectedSongs[songId]){
    newState[songId] = false;
    document.getElementById(songId).className = 'songInactive';
  }
  else {
    newState[songId] = true;
    document.getElementById(songId).className = 'songActive';
  }
  this.setState({
    selectedSongs: newState
  });
}

//call from onAlbumToggle
addSongsFromAlbum(songArray){
  songArray.forEach((song) => {
    this.onSongClick(song);
  });
}

render () {
  if (this.props.currentAlbumList.albums){
    this.albumList = this.props.currentAlbumList.albums.items.filter((album) => {
    return album.album_type === 'album';
    });
  }
    return (
    <div>
      {this.renderSelectToggle()}
      <form onSubmit={this.onAlbumsSubmit}>
        {this.albumList && this.albumList.map((album) => {
        return (<div key={album.id}>
            <div>{album.name}</div>
            <input
              className="squaredOne"
              type="checkbox"
              name={album.id}
              onChange={this.onAlbumToggle}
              checked={this.state.indexSelected.indexOf(album.id) > -1}
              value={album.id} />
              <img className="albumCover" src={album.images[0].url} />
              <SongsForm album={album.id} onSongClick={this.onSongClick} addSongsFromAlbum={this.addSongsFromAlbum} />
            </div>
        );
      })}
        <button>Visualize</button>
      </form>
    </div>);
  }
}
