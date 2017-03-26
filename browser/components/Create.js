import React, {Component} from 'react';
import ArtistsForm from './ArtistsForm';
import AlbumsForm from './AlbumsForm';
import HeaderContainer from '../containers/HeaderContainer';
import Sidebar from './Sidebar';
import axios from 'axios';
import {browserHistory} from 'react-router';

export default class Create extends Component {
  constructor(props){
    super(props);
    this.onAlbumsSubmit = this.onAlbumsSubmit.bind(this);
    this.submitPlaylist = this.submitPlaylist.bind(this);
  }
  onAlbumsSubmit(event){
    event.preventDefault();
  }

  submitPlaylist(){
    var songs = this.props.currentSongList.map((song) => song.id);
    var name = document.getElementById('playlistName').value;
    axios.get(`/api/playlists/${name}`)
      .then((playlist) => playlist.data.spotifyId)
      .then((playlistId) => {
          axios.post(`/api/playlists/${name}/addSongs`, {
            playlistId: playlistId,
            uris: songs
          })
          .then(() => browserHistory.push(`${playlistId}/confirm`))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));

  }

  render () {
    return (
      <div>
        <HeaderContainer />
        <h1>Pick songs to add to your playlist. Search Artist below!</h1>
        <ArtistsForm fetchAlbums={this.props.fetchAlbums} />
        <button onClick={this.props.goBack}>BACK</button>

        {this.props.currentAlbumList.albums ?
          <div className="songSelectionContainer">
            <Sidebar
              className="songSelectionSidebar"
              getSongs={this.props.getSongs}
              removeSongs={this.props.removeSongs}
              removeAll={this.props.removeAll}
              currentSongList={this.props.currentSongList}
              inCreate={true}
              />
            <form className="songSelectionForm">
              <button className="submitSelection" onClick={this.onAlbumsSubmit}>Visualize</button>
              <AlbumsForm
                currentAlbumList={this.props.currentAlbumList}
                getSongs={this.props.getSongs}
                removeSongs={this.props.removeSongs}
                removeAll={this.props.removeAll}
                currentSongList={this.props.currentSongList}
                />
            </form>
            <button className="submitSelection" onClick={this.submitPlaylist}>Create Playlist</button>
            <input id="playlistName" type="text" placeholder="Name Your Playlist" />
          </div>
        : null}
      </div>
  );}
}
