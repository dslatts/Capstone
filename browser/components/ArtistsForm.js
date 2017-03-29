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
      <form className="artistSearchSubmission" onSubmit={this.onArtistsSubmit}>
        <input className="artistSearchInput" onChange={this.onArtistChange} placeholder="Search Artists" />
        <input id="search_submit" type="submit"></input>
      </form>
    </div>
    );
  }
}
