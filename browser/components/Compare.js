import React, {Component} from 'react';
import ArtistsForm from './ArtistsForm';
import AlbumsForm from './AlbumsForm';
import HeaderContainer from '../containers/HeaderContainer';
import Sidebar from './Sidebar';
import {Link} from 'react-router';

export default class Compare extends Component {
  componentWillUnmount(){
    //Remove all songs and albums off state when you go back
    this.props.goBack();
    this.props.removeAlbums();
    this.props.removeAll();
  }
  onAlbumsSubmit(event){
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <HeaderContainer goBack={this.props.goBack} />
        <div className="songSelectionContainer">
          <div className= {this.props.currentAlbumList.albums ? 'searchContainer moved' : 'searchContainer' }>
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
              />
            <div className="songSelectionForm" onSubmit={this.onAlbumsSubmit}>

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
        <div>
          <h1 className="titleText">Search for an artist to compare songs</h1>
          <button className="backButton" onClick={this.props.goBack}>Go Back</button>
        </div>
    }
        </div>
    </div>
    );
  }
}
