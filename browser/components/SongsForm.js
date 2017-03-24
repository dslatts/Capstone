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
    axios.get(`https://api.spotify.com/v1/albums/${this.props.album.id}/tracks`)
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
        <div>{this.props.album.name}</div>
        <input
          className="squaredOne"
          type="checkbox"
          name={this.props.album.id}
          onChange={()=>{this.props.onAlbumToggle(this.props.album.id, this.state.songList);}}
          checked={this.props.albumCheck(this.props.album.id)}
          value={this.props.album.id} />
        <img className="albumCover" src={this.props.album.images[0].url} />
      </div>

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
