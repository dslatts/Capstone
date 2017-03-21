import React, {Component} from 'react';
import axios from 'axios';

export default class SongsForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      songList: []
    };
  }
  componentDidMount(){
    axios.get(`https://api.spotify.com/v1/albums/${this.props.album}/tracks`)
        .then((res) => res.data)
        .then((songs) => {
            this.setState({songList: songs.items});
        })
        .catch(function (err) {
            console.error(err);
        });
  }
  render() {
    return (
    <div>
      <ul>
      {this.state.songList.length > 0 && this.state.songList.map((song) => {
        return <li key={song.id}>{song.name}</li>;
      })}
      </ul>
    </div>
    )}
}

