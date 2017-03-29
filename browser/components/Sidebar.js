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
              <li className="selectedSongContainer" key={song.id}>
                <div className="removeSelectedSong" onClick={() => this.removeSong(song)}><img className="removeSongButton" src='images/delete_icon.png' /></div>
                <div className="selectedSong" id={'sidebar' + song.id}>
                  <div><p className="selectedSongName">{song.name}</p></div>
                  <div><p className="selectedSongArtistName">{song.artists[0].name}</p></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
  );
  }
}
