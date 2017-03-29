import React from 'react'
import Bubble from './Bubble.js'
import ReactTransitionGroup from 'react-addons-transition-group'
import {scaleLinear, scalePoint} from 'd3-scale'

import { connect } from 'react-redux';


class CompareChart extends React.Component{

  constructor(props){
    super(props)
    this.state = {width: 500, height: 500, group:'', params:['valence', 'energy'], songGroups: {artists: [], album: []}, displayChart:false}
    this.setScales = this.setScales.bind(this);
    this.getXCoord = this.getXCoord.bind(this);
    this.changeParam = this.changeParam.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
    this.newXScale = this.newXScale.bind(this);
    this.newYScale = this.newYScale.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.currentSongList.songList.length > 0){
      let artistArr = []
      let albumsArr = []
      nextProps.currentSongList.songList.forEach(song =>{
        if (!artistArr.includes(song.artists[0].name)){
          artistArr = artistArr.concat(song.artists[0].name)
      }
        if (!albumsArr.includes(song.album)){
          albumsArr = albumsArr.concat(song.album);
        }
      })

      this.setState({displayChart: true, songGroups: {artists: artistArr, album: albumsArr}});
    }
  }

  newXScale(data){
      if (this.state.songGroups){
      return (data) => scalePoint()
        .domain([0, this.state.width])
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


    }
      yScale = () => scaleLinear()
      .range([this.state.height, 0])

      this.setState({xScale: xScale, yScale: yScale})
  }

  getXCoord(song){
    if (this.state.group === 'artists') return song.artists[0].name
    else if (this.state.group === 'album') return song.album
    else return song.audioFeatures[this.state.params[1]]
  }

  changeParam(event){
    event.preventDefault()
    let newParams = [];
    if (this.state.group){
      if (event.target.name === this.state.params[1]){
        newParams.push(event.target.name, this.state.params[0])
      }
      else {
        newParams.push(event.target.name, this.state.params[0])
      }
    }
    else if (this.state.params.includes(event.target.name)){
        newParams.push(this.state.params[1], this.state.params[0])
      }
    else {
        newParams.push(this.state.params[1], event.target.name)
    }
    this.setState({params: newParams})
  }

  changeGroup(event){
    event.preventDefault()
    let group = this.state.group
    if (group === event.target.name){
      group = ''
    }
    else {
      group = event.target.name
    }
    this.setState({group: group})
  }

  render(){
    //params, group
    let scatterScale = scaleLinear()
        .range([0, this.state.width])

    let yScale = scaleLinear()
    .range([this.state.height, 0])

    let stackedScale = (this.state.group) ? (scalePoint()
        .domain(this.state.songGroups[this.state.group])
        .range([0, this.state.width])
        .padding(0.25)) : null


    let xScale

    //pass the value to the node
    //conditional is based on


    xScale = (!this.state.group) ? scatterScale : stackedScale

    return (
      (this.state.displayChart) ?
      <div>
        <svg width={this.state.width} height={this.state.height}>
          <g>
            {/*<ReactTransitionGroup component ="g">*/}
              {this.props.currentSongList.songList.map((song) =>
                {
                return (<Bubble
                d={song}
                key={song.id}
                x={xScale(this.getXCoord(song))}
                y={yScale(song.audioFeatures[this.state.params[0]])} />
                )}
              )}
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
          <button name="valence" onClick={this.changeParam}> Sentiment </button>
          <button name="energy" onClick={this.changeParam}> Energy </button>
          <button name="danceability" onClick={this.changeParam}> Danceability </button>

        </div>
      </div>
      : null
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentSongList: state.currentSongList
  };
};

export default connect(mapStateToProps)(CompareChart);


//fix the buttons func

//fix the other func ( the story getter,)
// x coord- can this be simplified
// find what logic we are repeating accross these functions.

/*component renders -> no songs on props.
component receives songs
if component haas songs, can show the visualization.

*/


//fix group change buttons, metrics change buttons

//group button - initial state is empty
//if click a button and it is the current group - unselects getGroups
//if click a button and it is not the current group - changes group


//change parameters:
/*
if we have a group
  going to change x param

if we have a group
  if x = clicked
    x = y
  change y param to it

if no group
  if param.includes
    params.reverse
  else param x = y, param y = x
*/

