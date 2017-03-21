import React, {Component} from 'react';
import SongsForm from './SongsForm';

export default class AlbumsForm extends Component {
constructor(props){
  super(props);
  this.state = {
    indexSelected: [],
    selectedAlbum: ''
  };
  this.albumList = [];
  this.renderSelectToggle = this.renderSelectToggle.bind(this);
  this.selectToggle = this.selectToggle.bind(this);
  this.onAlbumsSubmit = this.onAlbumsSubmit.bind(this);
  this.onAlbumToggle = this.onAlbumToggle.bind(this);
  this.onImageClick = this.onImageClick.bind(this);
}

componentWillMount(){
  if (this.props.currentAlbumList.albums){
    this.albumList = this.props.currentAlbumList.albums.items.filter((album) => {
    return album.album_type === 'album';
    });
  }
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
onImageClick(albumId){
  this.setState({selectedAlbum: albumId});
}

render () {
  console.log(this.state);
    return (
    <div>
      {this.renderSelectToggle()}
      <form onSubmit={this.onAlbumsSubmit}>
        {this.albumList && this.albumList.map((album) => {
        return (<div key={album.id}>
            <input
              type="checkbox"
              name={album.id}
              onChange={this.onAlbumToggle}
              {...console.log(this.state.indexSelected.indexOf(album.id))}
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
