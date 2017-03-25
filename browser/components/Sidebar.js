import React, {Component} from 'react';

export default class Sidebar extends Component {
  constructor(props){
    super(props);
    this.removeSong = this.removeSong.bind(this);
  }

  removeSong(song){
    document.getElementById('sidebar' + song.id).remove();
    this.props.removeSongs(song);
  }

  render () {
    return (
      <div className="songContainer">
        <ul className="songList">
          {this.props.currentSongList && this.props.currentSongList.map(song => {
            return (
              <li className="selectedSong" key={song.id}>
                <div id={'sidebar' + song.id}>
                  <p className="selectedSongName">{song.name}</p>
                  <p className="selectedSongArtistName">{song.artists[0].name}</p>
                  <div className="removeSelectedSong" onClick={() => this.removeSong(song)}>X</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
  );
  }
}
