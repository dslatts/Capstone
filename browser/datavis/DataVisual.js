import React, {Component} from 'react';
import drawCanvas from './Scatter.js';

export default class DataVisual extends Component {

  componentDidMount(){
    drawCanvas()
  }

  render() {
    return (
      <div>
        <div id="chart"></div>
        <div>
          Group By:
          <button name="artist">Artists</button>
          <button name="albumName">Albums</button>
        </div>
        <div>
          Compare:
          <button name="valence"> Valence </button>
          <button name="energy"> Energy </button>
        </div>
      </div>
      );
  }
}
