import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import React, {Component} from 'react';

let data = [
      {song: 'Click some songs!', happiness: .5},
     ];

export default class CreateChart extends Component {
  constructor(props){
    super(props);
    }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
      mutateData(nextProps.playlist);
    }

  render () {
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    return (
      <AreaChart width={windowWidth * .7} height={windowHeight * .3} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <XAxis dataKey="song"/>
        <YAxis domain={[0, 1]}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Area type='monotone' dataKey='happiness' stroke='#f26d26' fill='#f26d26' />
      </AreaChart>
    );
  }
}

function mutateData(playlist) {
  if (playlist.length > 0) {
    data = playlist.map(val => {
      if (val){
        return {song: val.name, happiness: val.audioFeatures.valence};
      }
    }).filter(( element ) => {
      return element !== undefined;
    });
  }
  else {
    data = [{song: 'Click some songs!', happiness: .5}];
  }
}
//
