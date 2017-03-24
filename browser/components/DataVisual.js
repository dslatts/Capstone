import React, {Component} from 'react';
import drawCanvas from './chart.js';
import * as d3 from "d3"

export default class DataVisual extends Component {

  componentDidMount(){
    drawCanvas()
  }

  render() {
    return (<div id="chart"></div>);
  }
}
