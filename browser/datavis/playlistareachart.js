import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import React, {Component} from 'react';

const data = [
      {song: 'Bohemian Rapsody', uv: .45, pv: 2400, amt: 2400},
      {song: 'We are the champions', uv: .78, pv: 1398, amt: 2210},
      {song: 'Stairway to Heaven', uv: .93, pv: 9800, amt: 2290},
      {song: 'Hey Jude', uv: .12, pv: 3908, amt: 2000},
      {song: 'I dont wanna miss a thing', uv: .16, pv: 4800, amt: 2181},
      {song: 'Numb', uv: .38, pv: 3800, amt: 2500},
      {song: 'Pain', uv: .52, pv: 4300, amt: 2100},
];

export default class PlaylistChart extends Component {
  constructor(props){
    super(props);
    this.state = {} 
  }
	render () {
  	return (
    	<AreaChart width={1500} height={400} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <XAxis dataKey="song"/>
        <YAxis domain={[0, 1]}/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    );
  }
}

