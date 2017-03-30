import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import React, {Component} from 'react';

let data = [
      {song: 'Click a playlist!', happiness: .5},
     ];

export default class PlaylistChart extends Component {
  
  constructor(props){
    super(props);
    }

  componentWillReceiveProps(){
      mutateData(this.props.playlist)
    }

    render () {

      console.log(this.props.playlist);
      return (
        <AreaChart width={1500} height={400} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <XAxis dataKey="song"/>
        <YAxis domain={[0, 1]}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Area type='monotone' dataKey='happiness' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    );
  }
}

function mutateData(playlist) {
  if (playlist.length) {
    console.log(data);
    data = playlist.map(val => {
      return {song: val.track.name,happiness: val.valence}
    })
  }
}