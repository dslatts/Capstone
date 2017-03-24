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
      <div>
        <ul>
          {this.props.currentSongList && this.props.currentSongList.map(song => {
            return (
              <li key={song.id}>
                <div id={'sidebar' + song.id}>
                  <p>{song.name}</p>
                  <p>{song.artists[0].name}</p>
                  <div onClick={() => this.removeSong(song)}>X</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
  );
  }
}
