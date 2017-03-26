import React, {Component} from 'react';
import ArtistsForm from './ArtistsForm';
import AlbumsForm from './AlbumsForm';
import HeaderContainer from '../containers/HeaderContainer';
import Sidebar from './Sidebar';
import {Link} from 'react-router';

export default class Compare extends Component {

  onAlbumsSubmit(event){
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <HeaderContainer />
        <h1>Pick songs to compare. Search Artist below!</h1>
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
              />
            <form className="songSelectionForm" onSubmit={this.onAlbumsSubmit}>
              <button className="submitSelection">Visualize</button>
              <AlbumsForm
                currentAlbumList={this.props.currentAlbumList}
                getSongs={this.props.getSongs}
                removeSongs={this.props.removeSongs}
                removeAll={this.props.removeAll}
                currentSongList={this.props.currentSongList}
                />
            </form>
          </div>
        : null}
      </div>
    );
  }
}
