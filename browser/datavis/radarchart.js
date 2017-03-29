import React, {Component} from 'react';
 import {Radar, RadarChart, PolarGrid, Legend,
          PolarAngleAxis, PolarRadiusAxis} from 'recharts';
  export default class RdrChart extends Component {
  constructor(props){
    //dummy data
    super(props);
    const currentUser = this.props.currentUser;
    const latestHistory = currentUser.localProfile.histories[currentUser.localProfile.histories.length - 1];
    const earliestHistory = currentUser.localProfile.histories[0]
    let mapIt = function (x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
    this.state = {
      data: [ { subject: 'Danceability', A: currentUser.allUsersAvg.danceability, B: latestHistory.danceability, C: earliestHistory.danceability, fullMark: 1 },
     { subject: 'Tempo', A: mapIt(currentUser.allUsersAvg.tempo, 0, 225, 0, 1), B: mapIt(latestHistory.tempo, 0, 225, 0, 1), C: mapIt(earliestHistory.tempo, 0, 225, 0, 1), fullMark: 1 },
     { subject: 'Happiness', A: currentUser.allUsersAvg.valence, B: latestHistory.valence, C: earliestHistory.valence, fullMark: 1 },
     { subject: 'Energy', A: currentUser.allUsersAvg.energy, B: latestHistory.energy, C: earliestHistory.energy, fullMark: 1 },
     { subject: 'Acousticness', A: currentUser.allUsersAvg.acousticness, B: latestHistory.acousticness, C: earliestHistory.acousticness, fullMark: 1 },
     { subject: 'Loudness', A: mapIt(currentUser.allUsersAvg.loudness, 0, -60, 0, 1), B: mapIt(latestHistory.loudness, 0, -60, 0, 1), C: mapIt(earliestHistory.loudness, 0, -60, 0, 1), fullMark: 1 }]
    }
    console.log(this.state);
   }

   //if (this.props.currentUser.localProfile.histories.length > 1)
    render () {
      return (
        <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={this.state.data}>
           <Radar name="All Users Average History" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
           <Radar name="Your Last Log-in" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.65}/>
           <Radar name="Your First Log-in" dataKey="C" stroke="#ce1471" fill="#ce1471" fillOpacity={0.7}/>
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