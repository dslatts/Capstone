import React, {Component} from 'react';
import SongsForm from './SongsForm';

export default class AlbumsForm extends Component {
constructor(props){
  super(props);
  this.state = {
    indexSelected: []

  };
  this.albumList = [];
  this.renderSelectToggle = this.renderSelectToggle.bind(this);
  this.selectToggle = this.selectToggle.bind(this);
  // this.onAlbumsSubmit = this.onAlbumsSubmit.bind(this);
  this.onAlbumToggle = this.onAlbumToggle.bind(this);
  this.onSongClick = this.onSongClick.bind(this);
  this.albumCheck = this.albumCheck.bind(this);
  this.setSongToFalse = this.setSongToFalse.bind(this);
  this.setSongToTrue = this.setSongToTrue.bind(this);
}

//changes button to say select all/deselect all
renderSelectToggle(){
  if (this.state.indexSelected.length < this.albumList.length){
    return (<button className="submitSelection" onClick={() => this.selectToggle(0)}>Select All</button>);
  }
  else {
    return (<button className="submitSelection" onClick={() => this.selectToggle(1)}>Deselect All</button>);
  }
}

//NOTE: To select all, we are clearing out local state so onAlbumToggle adds them all to indexSelected and store
selectToggle(decider){
  if (decider === 1){
    this.setState({
      // indexSelected: [...this.albumList.map((album) => album.id)]
      indexSelected: this.albumList.map(album => album.id)
    });
  }
  else {
    this.setState({
      indexSelected: []
    });
  }
  this.albumList.forEach((album) => {
    document.getElementById(album.id + 'check').click();
  });
}

albumCheck(albumid){
  return (this.state.indexSelected.indexOf(albumid) > -1);
}

onAlbumToggle(albumId, songlist){
  let albums;
  if (this.state.indexSelected.indexOf(albumId) > -1) {  // is selected
    albums = this.state.indexSelected.filter(id => id !== albumId);  //unselects them
  } else {
    albums = this.state.indexSelected.concat([albumId]);
  }
  this.setState({
    indexSelected: albums
  });
  this.addSongsFromAlbum(songlist, this.state.indexSelected.indexOf(albumId) > -1);
}

//call from onAlbumToggle
addSongsFromAlbum(songArray, selectedBool){
  songArray.forEach((song) => {
    if (selectedBool && this.props.currentSongList.includes(song)){
      this.setSongToFalse(song);
    }
    else if (!selectedBool && !this.props.currentSongList.includes(song)) {
      this.setSongToTrue(song);
    }
  });
}

onSongClick(song){
  if (this.props.currentSongList.includes(song)){
    this.setSongToFalse(song);
  }
  else {
    this.setSongToTrue(song);
  }
}

setSongToTrue(song){
  document.getElementById(song.id).className = 'songActive';
  this.props.getSongs(song);
}

setSongToFalse(song){
  document.getElementById(song.id).className = 'songInactive';
  this.props.removeSongs(song);
}

render () {
  if (this.props.currentAlbumList.albums){
    this.albumList = this.props.currentAlbumList.albums.items.filter((album) => {
    return album.album_type === 'album';
    });
  }
  return (
    <div className="songSelection">
      {this.renderSelectToggle()}
      <div className="albums">
        {this.albumList && this.albumList.map((album) => {
          return (
            <div key={album.id}>
              <SongsForm
                album={album}
                onSongClick={this.onSongClick}
                onAlbumToggle={this.onAlbumToggle}
                addSongsFromAlbum={this.addSongsFromAlbum}
                albumCheck={this.albumCheck}
                currentSongList={this.props.currentSongList}
                />
            </div>
          );
        })}
      </div>
    </div>);
  }
}
