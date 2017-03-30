import React, {Component} from 'react';
 import {Radar, RadarChart, PolarGrid, Legend,
          PolarAngleAxis, PolarRadiusAxis} from 'recharts';


 //TODO: need to convert tempo and loudness to 0 to 1 scale
 //https://gist.github.com/remy/5213884

  export default class RdrChart extends Component {
  constructor(props){
    //dummy data
    super(props);
    const currentUser = this.props.currentUser;
    const currentLogin = currentUser.localProfile.histories[currentUser.localProfile.histories.length - 1];
    // TODO currently using FIRST available, not LAST login, simply for testing purposes.
    const lastLogin = currentUser.localProfile.histories[0];
    let mapIt = function (x, in_min, in_max, out_min, out_max) {
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    };
    this.state = {
      data: [
        { subject: 'Danceability', A: mapIt(currentUser.allUsersAvg.danceability, 0.45, 0.85, 0, 1), B: mapIt(currentLogin.danceability, 0.45, 0.85, 0, 1), C: mapIt(lastLogin.danceability, 0.45, 0.85, 0, 1), fullMark: 1 },
        { subject: 'Tempo', A: mapIt(currentUser.allUsersAvg.tempo, 90, 140, 0, 1), B: mapIt(currentLogin.tempo, 90, 140, 0, 1), C: mapIt(lastLogin.tempo, 90, 140, 0, 1), fullMark: 1 },
        { subject: 'Happiness', A: mapIt(currentUser.allUsersAvg.valence, 0.2, 0.75, 0, 1), B: mapIt(currentLogin.valence, 0.2, 0.75, 0, 1), C: mapIt(lastLogin.valence, 0.2, 0.75, 0, 1), fullMark: 1 },
        { subject: 'Energy', A: mapIt(currentUser.allUsersAvg.energy, 0, 0.75, 0, 1), B: mapIt(currentLogin.energy, 0, 0.75, 0, 1), C: mapIt(lastLogin.energy, 0, 0.75, 0, 1), fullMark: 1 },
        { subject: 'Acousticness', A: mapIt(currentUser.allUsersAvg.acousticness, 0, 0.75, 0, 1), B: mapIt(currentLogin.acousticness, 0, 0.75, 0, 1), C: mapIt(lastLogin.acousticness, 0, 0.75, 0, 1), fullMark: 1 },
        { subject: 'Loudness', A: mapIt(currentUser.allUsersAvg.loudness, -10, 0, 0, 1), B: mapIt(currentLogin.loudness, -10, 0, 0, 1), C: mapIt(lastLogin.loudness, -10, 0, 0, 1), fullMark: 1 }]
    };
  }

  sizeCalc(){
    const usersAvg = this.state.data.reduce((acc, datum) => datum.A + acc, 0);
    const current = this.state.data.reduce((acc, datum) => datum.B + acc, 0);
    const prev = this.state.data.reduce((acc, datum) => datum.C + acc, 0);
    let returnarr = [['All Users Average History', usersAvg, '#8884d8', 'A'], ['Current Login', current, '#82ca9d', 'B'], ['Previous Login', prev, '#ce1471', 'C']].sort(function(a, b){return a[[1]] - b[1];});
    return returnarr;
  }

   //if (this.props.currentUser.localProfile.histories.length > 1)!
  render () {
    var sizecalc = this.sizeCalc();
    return (
      <RadarChart className="radarChart" cx={300} cy={250} outerRadius={150} width={600} height={500} data={this.state.data}>
        <Radar className="areaLarge" name={sizecalc[2][0]} dataKey={sizecalc[2][3]} stroke={sizecalc[2][2]} fill={sizecalc[2][2]} fillOpacity={0.6} />
        <Radar className="areaMedium" name={sizecalc[1][0]} dataKey={sizecalc[1][3]} stroke={sizecalc[1][2]} fill={sizecalc[1][2]} fillOpacity={0.5} />
        <Radar className="areaSmall" name={sizecalc[0][0]} dataKey={sizecalc[0][3]} stroke={sizecalc[0][2]} fill={sizecalc[0][2]} fillOpacity={0.4} />
        <PolarGrid />
        <Legend />
        <PolarAngleAxis dataKey="subject" />
       </RadarChart>
    );
  }
}
