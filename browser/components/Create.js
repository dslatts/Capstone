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

  componentWillUnmount(){
    //Remove all songs and albums off state when you go back
    this.props.goBack();
    this.props.removeAlbums();
    this.props.removeAll();
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

        <HeaderContainer goBack={this.props.goBack}  />
          <div className="songSelectionContainer">
            <div className= {this.props.currentAlbumList.albums ? "searchContainer moved" : "searchContainer" }>
                <ArtistsForm fetchAlbums={this.props.fetchAlbums} />
            </div>
          {this.props.currentAlbumList.albums ?
          <div>
            <div className="shadowfix" />
            <Sidebar
              className="songSelectionSidebar"
              getSongs={this.props.getSongs}
              removeSongs={this.props.removeSongs}
              removeAll={this.props.removeAll}
              currentSongList={this.props.currentSongList}
              inCreate={true}
              />
            <div className="songSelectionForm">
              <AlbumsForm
                createOrCompare={this.props.createOrCompare}
                currentAlbumList={this.props.currentAlbumList}
                getSongs={this.props.getSongs}
                removeSongs={this.props.removeSongs}
                removeAll={this.props.removeAll}
                currentSongList={this.props.currentSongList}
                />
            </div>
            <div className="playlistSubmission">
              <input id="playlistName" type="text" placeholder="Name Your Playlist" />
              <button onClick={this.submitPlaylist}>Create Playlist</button>
            </div>
          </div>
        :
        <div>
          <h1 className='titleText'>Search artists to start your playlist</h1>
          <button className="backButton" onClick={this.props.goBack}>Go Back</button>
        </div>
      }
      </div>
    </div>
  );}
}
