import React, {Component} from 'react';
import axios from 'axios';

export default class SongsForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      songList: []
    };
  }
  componentDidMount(){
    axios.get(`https://api.spotify.com/v1/albums/${this.props.album}/tracks`)
        .then((res) => res.data)
        .then((songs) => {
            this.setState({songList: songs.items});
        })
        .catch(function (err) {
            console.error(err);
        });
  }
  render() {
    return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sample</th>
          </tr>
        </thead>
        <tbody>
          {this.state.songList.length > 0 && this.state.songList.map((song) => {
          return (
          <tr key={song.id}>
            <td>{song.name}</td>
            <td><audio controls><source src={song.preview_url} type="audio/mpeg" /></audio></td>
          </tr>
        );})}
        </tbody>
      </table>
    </div>
    );
  }
}

