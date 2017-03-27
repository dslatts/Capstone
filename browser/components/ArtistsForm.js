import React, {Component} from 'react';

export default class ArtistsForm extends Component {
constructor(props){
  super(props);
  this.state = {
    inputValue: ''
  };
  this.onArtistsSubmit = this.onArtistsSubmit.bind(this);
  this.onArtistChange = this.onArtistChange.bind(this);
}
onArtistChange(event){
  event.preventDefault();
  this.setState({
    inputValue: event.target.value
  });
}
onArtistsSubmit(event){
  event.preventDefault();
  //replaces spaces with '+' which works for spotify API
  const artistName = this.state.inputValue.split(' ').join('+');
  this.props.fetchAlbums(artistName);
}
  render () {
    return (
    <div className="SearchBar">
      <form onSubmit={this.onArtistsSubmit}>
        <input onChange={this.onArtistChange} placeholder="Search Artists" /><button>Search</button>
      </form>
    </div>
    );
  }
}
