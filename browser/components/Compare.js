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

        {this.props.currentAlbumList.albums ?
          <div className="songSelectionContainer">
            <Sidebar
              className="songSelectionSidebar"
              getSongs={this.props.getSongs}
              removeSongs={this.props.removeSongs}
              removeAll={this.props.removeAll}
              currentSongList={this.props.currentSongList}
              />
            <div className="songSelectionForm" onSubmit={this.onAlbumsSubmit}>
              <div className="searchContainer">
                <ArtistsForm fetchAlbums={this.props.fetchAlbums} />
                <button className="backButton" onClick={this.props.goBack}>BACK</button>
              </div>
              <AlbumsForm
                createOrCompare={this.props.createOrCompare}
                currentAlbumList={this.props.currentAlbumList}
                getSongs={this.props.getSongs}
                removeSongs={this.props.removeSongs}
                removeAll={this.props.removeAll}
                currentSongList={this.props.currentSongList}
                />
            </div>
          </div>
        :
        <div className="songSelectionContainer">
          <h1 className='titleText'>Pick songs to compare. Search Artist below!</h1>
          <ArtistsForm fetchAlbums={this.props.fetchAlbums} />
          <button className="backButton" onClick={this.props.goBack}>BACK</button>
        </div>
      }
      </div>
    );
  }
}
