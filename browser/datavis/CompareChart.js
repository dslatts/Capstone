import React from 'react'
import Bubble from './Bubble.js'
import {scaleLinear, scalePoint} from 'd3-scale'
import {Xaxis, Yaxis, Grid} from 'react-d3-core';
import { connect } from 'react-redux';


class CompareChart extends React.Component{

  constructor(props){
    super(props)
    this.state = {width: 500, height: 500, padding:25, group:'', params:['valence', 'energy'], songGroups: {artists: [], album: []}, displayChart:false}
    this.getXCoord = this.getXCoord.bind(this);
    this.changeParam = this.changeParam.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
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
        .range([0, this.state.width - (this.state.padding * 2)])

    let yScale = scaleLinear()
    .range([this.state.height - (this.state.padding * 2), 0])

    let stackedScale = (this.state.group) ? (scalePoint()
        .domain(this.state.songGroups[this.state.group])
        .range([0, this.state.width - (this.state.padding * 2)])
        .padding(0.25)) : null


    let xScale



    //pass the value to the node
    //conditional is based on


    xScale = (!this.state.group) ? scatterScale : stackedScale


    return (
      (this.state.displayChart) ?
      <div>
        <svg width={this.state.width} height={this.state.height}>
        <g width={this.state.width - (this.state.padding * 2)} height={this.state.height - (this.state.padding * 2)} transform={`translate(${this.state.padding},${this.state.padding})`}>
          <Grid
            margins={{top: 0, right: 0, bottom: 0, left: 0}}
            width={this.state.width - (this.state.padding * 2)}
            height={this.state.height - (this.state.padding * 2)}
            y = {
              (d) => d.audioFeatures[this.state.params[0]]
            }
            type = {'y'}
            yDomain = {[0, 1]}
            yRange = {[this.state.height - (this.state.padding * 2), 0]}
            yScale = 'linear'
            style = {{stroke: 'white', fill: 'white'}}
            />
          <g>
              {this.props.currentSongList.songList.map((song) =>
                {
                return (<Bubble
                d={song}
                params= {this.state.params}
                key={song.id}
                x={xScale(this.getXCoord(song))}
                y={yScale(song.audioFeatures[this.state.params[0]])} />
                )}
              )}
          </g>
          {(this.state.group) ?
            <Xaxis
            width={this.state.width - (this.state.padding * 2)}
            height={this.state.height - (this.state.padding * 2)}
            margins={{top: 0, right: 0, bottom: (this.state.padding / 2), left: 0}}
            x = {
              (this.state.group === 'artists') ?
              ((d) => d.artists[0].name) : ((d) => d.album)
            }
            xDomain = {this.state.songGroups[this.state.group]}
            xRange = {[0, this.state.width - (this.state.padding * 2)]}
            xScale = 'ordinal'
            style = {{stroke: 'white', fill: 'white'}}
            /> :
            <Xaxis
            width={this.state.width - (this.state.padding * 2)}
            height={this.state.height - (this.state.padding * 2)}
            margins={{top: 0, right: 0, bottom: 0, left:  0}}
            x = {
              (d) => d.audioFeatures[this.state.params[1]]
            }
            xDomain = {[0, 1]}
            xRange = {[0, this.state.width - (this.state.padding * 2)]}
            xScale = 'linear'
            style = {{stroke: 'white', fill: 'white'}}
            />
          }
            <Yaxis
            margins={{top: 0, right: 0, bottom: 0, left: -this.state.padding}}
            width={this.state.width - (this.state.padding * 2)}
            height={this.state.height - (this.state.padding * 2)}
            y = {
              (d) => d.audioFeatures[this.state.params[0]]
            }
            yDomain = {[0, 1]}
            yRange = {[this.state.height - (this.state.padding * 2), 0]}
            yScale = 'linear'
            style = {{stroke: 'white', fill: 'white'}}
            />



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
