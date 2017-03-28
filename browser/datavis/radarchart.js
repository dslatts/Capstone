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
        { subject: 'Danceability', A: currentUser.allUsersAvg.danceability, B: currentLogin.danceability, C: lastLogin.danceability, fullMark: 1 },
        { subject: 'Tempo', A: mapIt(currentUser.allUsersAvg.tempo, 0, 225, 0, 1), B: mapIt(currentLogin.tempo, 0, 225, 0, 1), C: mapIt(lastLogin.tempo, 0, 225, 0, 1), fullMark: 1 },
        { subject: 'Happiness', A: currentUser.allUsersAvg.valence, B: currentLogin.valence, C: lastLogin.valence, fullMark: 1 },
        { subject: 'Energy', A: currentUser.allUsersAvg.energy, B: currentLogin.energy, C: lastLogin.energy, fullMark: 1 },
        { subject: 'Acousticness', A: currentUser.allUsersAvg.acousticness, B: currentLogin.acousticness, C: lastLogin.acousticness, fullMark: 1 },
        { subject: 'Loudness', A: mapIt(currentUser.allUsersAvg.loudness, -60, 0, 0, 1), B: mapIt(currentLogin.loudness, -60, 0, 0, 1), C: mapIt(lastLogin.loudness, -60, 0, 0, 1), fullMark: 1 }]
    };
  }

  sizeCalc(){
    const usersAvg = this.state.data.reduce((acc, datum) => datum.A + acc, 0);
    const current = this.state.data.reduce((acc, datum) => datum.B + acc, 0);
    const prev = this.state.data.reduce((acc, datum) => datum.B + acc, 0);
    let returnarr = [['All Users Average History', usersAvg, '#8884d8', 'A'], ['Current Login', current, '#82ca9d', 'B'], ['Previous Login', prev, '#ce1471', 'C']].sort(function(a, b){return a[[1]] - b[1];});
    // returnarr[0].push('areaSmall', 0.4);
    // returnarr[1].push('areaMedium', 0.5);
    // returnarr[2].push('areaLarge', 0.6);
    // let returnObj = {};
    // returnarr.forEach(objArr => {
    //   returnObj[objArr[0]] = {
    //     class: objArr[2],
    //     opacity: objArr[3]
    //   };
    // });
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


  // TODO: State will be two objects
  // AllUsers (Average), YourHistory
  // Function to convert the data to the format needed
  // state.currentUser.allUsersAvg
  // state.currentUser.localProfile.Histories[last item]
  // state.currentUser.localProfile.Histories[last item - 1]
