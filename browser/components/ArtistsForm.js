import React, {Component} from 'react';

export default class ArtistsForm extends Component {
constructor(){
  super();
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
  console.log(this.state.inputValue);
}
  render () {
    return (
    <div>
      <form onSubmit={this.onArtistsSubmit}>
        <input onChange={this.onArtistChange} placeholder="Search Artists" />
      </form>
    </div>);
  }
}
