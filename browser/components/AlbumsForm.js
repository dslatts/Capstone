import React, {Component} from 'react';
import SongsForm from './SongsForm';

export default class AlbumsForm extends Component {
constructor(props){
  super(props);
  this.state = {
    // totalSongs = {}
    indexSelected: [],
    selectedSongs: {}
  };
  this.albumList = [];
  this.renderSelectToggle = this.renderSelectToggle.bind(this);
  this.selectToggle = this.selectToggle.bind(this);
  this.onAlbumsSubmit = this.onAlbumsSubmit.bind(this);
  this.onAlbumToggle = this.onAlbumToggle.bind(this);
  this.onSongClick = this.onSongClick.bind(this);
  this.albumCheck = this.albumCheck.bind(this);
  this.setSongToFalse = this.setSongToFalse.bind(this);
  this.setSongToTrue = this.setSongToTrue.bind(this);
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

albumCheck(albumid){
  return (this.state.indexSelected.indexOf(albumid) > -1);
}

onAlbumToggle(songId, songlist){
  let albums;
  if (this.state.indexSelected.indexOf(songId) > -1) {  // is selected
    albums = this.state.indexSelected.filter(id => id !== songId);  //unselects them
  } else {
    albums = [...this.state.indexSelected, songId];
  }
  this.setState({
    indexSelected: albums
  });
  this.addSongsFromAlbum(songlist, this.state.indexSelected.indexOf(songId) > -1);
}

onSongClick(songId){
  var newState = this.state.selectedSongs;
  if (this.state.selectedSongs[songId]){
    this.setSongToFalse(songId);
  }
  else {
    this.setSongToTrue(songId);
  }
  this.setState({
    selectedSongs: newState
  });
}

setSongToTrue(songId){
  var newState = this.state.selectedSongs;
  document.getElementById(songId).className = 'songActive';
  newState[songId] = true;
  this.setState({selectedSongs: newState});
}

setSongToFalse(songId){
  var newState = this.state.selectedSongs;
  document.getElementById(songId).className = 'songInactive';
  newState[songId] = false;
  this.setState({selectedSongs: newState});
}

//call from onAlbumToggle
addSongsFromAlbum(songArray, selectedBool){
  songArray.forEach((song) => {
    if (selectedBool){
      this.setSongToFalse(song);
    } else {
      this.setSongToTrue(song);
    }
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
              <SongsForm
                album={album}
                onSongClick={this.onSongClick}
                onAlbumToggle={this.onAlbumToggle}
                addSongsFromAlbum={this.addSongsFromAlbum}
                albumCheck={this.albumCheck}
                />
            </div>
        );
      })}
        <button>Visualize</button>
      </form>
    </div>);
  }
}
