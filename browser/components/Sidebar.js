import React, {Component} from 'react';

export default class Sidebar extends Component {
  constructor(props){
    super(props);
  }

  removeSong(songId){
    document.getElementById(songId).remove();
  }

  render () {
    return (
      <div>
        <ul>
          {this.props.songs && this.props.songs.map(song => {
            return (
              <div id={song.spotifyId}>
                <p>{song.title}</p>
                <div onClick={removeSong()}>X</div>
              </div>
            )
          })}
        </ul>
      </div>
  );
  }
}
