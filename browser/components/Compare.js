import React, {Component} from 'react';
import ArtistsForm from './ArtistsForm';
import AlbumsForm from './AlbumsForm';
import HeaderContainer from '../containers/HeaderContainer';
import Sidebar from './Sidebar';

export default class Compare extends Component {
  render () {
    return (<div>
    <HeaderContainer />
      <ArtistsForm fetchAlbums={this.props.fetchAlbums} />
      {this.props.currentAlbumList.albums ?
        <div>
          <Sidebar
            getSongs={this.props.getSongs}
            removeSongs={this.props.removeSongs}
            removeAll={this.props.removeAll}
            currentSongList={this.props.currentSongList}
            />
          <AlbumsForm
            currentAlbumList={this.props.currentAlbumList}
            getSongs={this.props.getSongs}
            removeSongs={this.props.removeSongs}
            removeAll={this.props.removeAll}
            currentSongList={this.props.currentSongList}
            />
        </div>
        : null}
    </div>);
  }
}
