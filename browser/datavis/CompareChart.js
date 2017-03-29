import React from 'react'
import Bubble from './Bubble.js'
import ReactTransitionGroup from 'react-addons-transition-group'
import {scaleLinear, scalePoint} from 'd3-scale'

import { connect } from 'react-redux';


class CompareChart extends React.Component{

  constructor(props){
    super(props)
    this.state = {width: 500, height: 500, group:'', params:['valence', 'energy'] }
    this.setScales = this.setScales.bind(this);
    this.getXCoord = this.getXCoord.bind(this);
    this.changeParam = this.changeParam.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.newXScale = this.newXScale.bind(this);
    this.newYScale = this.newYScale.bind(this);
  }

  componentDidMount(){
    this.getGroups();
    // this.setScales();

  }

  newXScale(data){
      if (this.state.songGroups){
      return (data) => scalePoint()
        .domain(this.state.songGroups[this.state.group])
        .range([0, this.state.width])
        .padding(0.25)
      }
  }

  newYScale(){
  return scaleLinear()
      .range([this.state.height, 0])
  }

  setScales(){
      let xScale, yScale

      if (this.state.params.length === 2){
      //set x scale for scatter/cluster chart
      xScale = () => scaleLinear()
        .range([0, this.state.width])
      }
      else {
      //set x scale for stacked chart

      xScale = () => scalePoint()
        .domain(this.state.songGroups[this.state.group])
        .range([0, this.state.width])
        .padding(0.25)
    }
      yScale = () => scaleLinear()
      .range([this.state.height, 0])

      this.setState({xScale: xScale, yScale: yScale})
  }

  getGroups(){
    let artistArr = []
    let albumArr = []
    this.props.currentSongList.songList.forEach(song => {
      if (!artistArr.includes(song.artists[0].name)){
        artistArr.push(song.artists[0].name)
      }
      if (!albumArr.includes(song.album)){
        albumArr.push(song.album)
      }
    })
    this.setState({songGroups: {artists: artistArr, album: albumArr}})
  }

  getXCoord(song){
    //for group and two params - we're gonna need another scale or maybe a force, skip for now
    if (this.state.group){
      if (this.state.params.length === 2){
        //group, 2 params = clusters
        console.log('feature in progress');
      }
      else {
        //group, 1 param = stacked
        return song[this.state.group]
      }
    }
    else {
      //!group, 2 params = scatter
      return song.audioFeatures[this.state.params[1]]
    }
  }

  changeParam(event){
    event.preventDefault();
    let newState = []
    if (this.state.params.length > 1){
      newState = [this.state.params[1], event.target.name];
    } else {
      newState = [...this.state.params, event.target.name];
    }
    this.setState({params: newState})
  }

  changeGroup(event){
    event.preventDefault();
    if (this.state.group === event.target.name && this.state.params.length > 1){
      this.setState({group: ''});
    }
    else {
      this.setState({group: event.target.name})
    }
  }

  render(){
    //params, group

    let xScale = scaleLinear()
        .range([0, this.state.width])

    let yScale= scaleLinear()
    .range([this.state.height, 0])


    return (
      <div>
        <svg width={this.state.width} height={this.state.height}>
          <g>
            {/*<ReactTransitionGroup component ="g">*/}
              {this.props.currentSongList.songList.map((song) =>
                {console.log(xScale(0))
                return <Bubble
                d={song}
                key={song.id}
                x={xScale(this.getXCoord(song))}
                y={yScale(song.audioFeatures[this.state.params[0]])} />
              })}
            {/*</ReactTransitionGroup> */}
          </g>
        </svg>
        <div>
          Group By:
          <button name="artists" onClick={this.changeGroup}>Artists</button>
          <button name="album" onClick={this.changeGroup}>Albums</button>
        </div>
        <div>
          Compare:
          <button name="valence" onClick={this.changeParam}> Valence </button>
          <button name="energy" onClick={this.changeParam}> Energy </button>
          <button name="danceability" onClick={this.changeParam}> Danceability </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentSongList: state.currentSongList
  };
};

export default connect(mapStateToProps)(CompareChart);
