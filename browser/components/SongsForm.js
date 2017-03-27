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
    //this is probs an anti-pattern but yolo
    axios.get(`https://api.spotify.com/v1/albums/${this.props.album.id}/tracks`)
    .then((res) => res.data)
    .then(songs => {
        let songIds = songs.items.map(song => song.id).join(',');
        axios.get(`/api/tracks/audio-features/?ids=${songIds}`)
        .then(res => res.data)
        .then(features => {
          console.log(features)
            let songsWithFeatures = songs.items.map((song, index) => {
                return {
                artists: song.artists,
                id: song.id,
                name: song.name,
                preview_url: song.preview_url,
                duration: song.duration_ms,
                audioFeatures: features.audio_features[index],
                album: this.props.album.name,
                image: this.props.album.images[0].url
                }
            });
            this.setState({songList: songsWithFeatures})
        });
    })
.catch(err => console.error(err));
  }

  render() {
    return (
      <div id={`${this.props.album.id}`} className="album">
        <div className="albumCoverImage">
          <div>{this.props.album.name}</div>
          <input
            id={`${this.props.album.id}check`}
            className="squaredOne"
            type="checkbox"
            name={this.props.album.id}
            onChange={() => {this.props.onAlbumToggle(this.props.album.id, this.state.songList);}}
            checked={this.props.albumCheck(this.props.album.id)}
            value={this.props.album.id} />
          <img className="albumCover" src={this.props.album.images[0].url} />
        </div>

        <div>
          <span className="songHeader">Track</span>
          <span className="songHeader">Sample</span>
        </div>
        <div className="songsList">
          {this.state.songList.length > 0 && this.state.songList.map((song) => {
            return (
              <Song key={song.id + 'songForm'} song={song} onSongClick={this.props.onSongClick} currentSongList={this.props.currentSongList} />
            );
          })
        }
        </div>
      </div>
    );
  }
}
