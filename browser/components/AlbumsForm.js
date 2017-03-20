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
    return (
    <div>
      <form onSubmit={this.onAlbumsSubmit}>
        {this.props.currentAlbumList && this.props.currentAlbumList.map((album) => {
          return <input key={album.id} type="checkbox" name={album.name} value={album.id} >{album.name}</input>;
        })}
        <button>Visualize</button>
      </form>
    </div>);
  }
}
