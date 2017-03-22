import React, {Component} from 'react';
import axios from 'axios';
import Song from './Song';


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
      <div>
        <span className="songHeader">Track</span>
        <span className="songHeader">Sample</span>
      </div>
        {this.state.songList.length > 0 && this.state.songList.map((song) => {
          return (
            <Song key={song.id} song={song} onSongClick={this.props.onSongClick} />
          );
        })
      }
    </div>
    );
  }
}

