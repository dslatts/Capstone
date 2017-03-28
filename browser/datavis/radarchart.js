import React, {Component} from 'react';
 import {Radar, RadarChart, PolarGrid, Legend,
          PolarAngleAxis, PolarRadiusAxis} from 'recharts';


 //TODO: need to convert tempo and loudness to 0 to 1 scale
 //https://gist.github.com/remy/5213884

  export default class RdrChart extends Component {
  constructor(props){
    //dummy data
    super(props);
    console.log(this.props);
    const currentUser = this.props.currentUser;
    const currentLogin = currentUser.localProfile.histories[currentUser.localProfile.histories.length - 1];
    // TODO currently using FIRST available, not LAST login, simply for testing purposes.
    const lastLogin = currentUser.localProfile.histories[0];
    let mapIt = function (x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};
    this.state = {
      data: [ { subject: 'Danceability', A: currentUser.allUsersAvg.danceability, B: currentLogin.danceability, C: lastLogin.danceability, fullMark: 1 },
     { subject: 'Tempo', A: mapIt(currentUser.allUsersAvg.tempo, 0, 225, 0, 1), B: mapIt(currentLogin.tempo, 0, 225, 0, 1), C: mapIt(lastLogin.tempo, 0, 225, 0, 1), fullMark: 1 },
     { subject: 'Happiness', A: currentUser.allUsersAvg.valence, B: currentLogin.valence, C: lastLogin.valence, fullMark: 1 },
     { subject: 'Energy', A: currentUser.allUsersAvg.energy, B: currentLogin.energy, C: lastLogin.energy, fullMark: 1 },
     { subject: 'Acousticness', A: currentUser.allUsersAvg.acousticness, B: currentLogin.acousticness, C: lastLogin.acousticness, fullMark: 1 },
     { subject: 'Loudness', A: mapIt(currentUser.allUsersAvg.loudness, 0, -60, 0, 1), B: mapIt(currentLogin.loudness, 0, -60, 0, 1), C: mapIt(lastLogin.loudness, 0, -60, 0, 1), fullMark: 1 }]
   };
   }

   //if (this.props.currentUser.localProfile.histories.length > 1)!
    render () {
      return (
        <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={this.state.data}>
           <Radar name="All Users Average History" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.4}/>
           <Radar name="Your Current Log-in" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.4}/>
           <Radar name="Your Last Log-in" dataKey="C" stroke="#ce1471" fill="#ce1471" fillOpacity={0.4}/>
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
