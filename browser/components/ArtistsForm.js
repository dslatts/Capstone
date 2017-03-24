import React, {Component} from 'react';
// import Radar from 'react-d3-radar';
import {Radar, RadarChart, PolarGrid, Legend,
         PolarAngleAxis, PolarRadiusAxis} from 'recharts';

//dummy data
         const data = [
    { subject: 'Danceability', A: .8, B: .7, fullMark: 1 },
    { subject: 'Tempo', A: 98, B: 130, fullMark: 1 },
    { subject: 'Happiness', A: .9, B: .2, fullMark: 1 },
    { subject: 'Energy', A: .85, B: .35, fullMark: 1 },
    { subject: 'Acousticness', A: .6, B: .4, fullMark: 1 },
    { subject: 'Loudness', A: -40, B: -20, fullMark: 1 },
];

//TODO: need to convert tempo and loudness to 0 to 1 scale
//https://gist.github.com/remy/5213884s

export default class ArtistsForm extends Component {
constructor(props){
  super(props);
  this.state = {
    inputValue: ''
  };
  this.onArtistsSubmit = this.onArtistsSubmit.bind(this);
  this.onArtistChange = this.onArtistChange.bind(this);
}
onArtistChange(event){
  event.preventDefault();
  this.setState({
    inputValue: event.target.value
  });
}
onArtistsSubmit(event){
  event.preventDefault();
  var temp = this.state.inputValue;
  //replaces spaces with '+' which works for spotify API
  temp = temp.split(' ').join('+');
  this.props.fetchAlbums(temp);
}
  render () {
    return (
    <div>
      <form onSubmit={this.onArtistsSubmit}>
        <input onChange={this.onArtistChange} placeholder="Search Artists" /><button>Search</button>
      </form>
    {/* react d3 Radar */}
{/*   <Radar
  width={500}
  height={500}
  padding={70}
  domainMax={1.0}
  highlighted={null}
  onHover={(point) => {
    if (point) {
      console.log('hovered over a data point');
    } else {
      console.log('not over anything');
    }
  }}
  data={{
    variables: [
      {key: 'danceability', label: 'Danceability'},
      {key: 'energy', label: 'Energy'},
      {key: 'happines', label: 'Happiness'},
      {key: 'tempo', label: 'Tempo'},
      {key: 'acousticness', label: 'Acousticness'},
      {key: 'instrumentalness', label: 'Instrumentalness'},
    ],
    sets: [
      {
        key: 'me',
        label: 'My Scores',
        values: {
          danceability: .2,
          energy: .4,
          happiness: .6,
          tempo: .8,
          acousticness: .3,
          instrumentalness: 1,
        },
      },
      {
        key: 'everyone',
        label: 'Everyone',
        values: {
          danceability: .9,
          energy: .7,
          happiness: .6,
          tempo: .4,
          acousticness: .2,
          instrumentalness: 0,
        },
      },
    ],
  }}
/>

<RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
          <Radar name="You" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
          <Radar name="Other" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}/>
          <PolarGrid />
          <Legend />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 1]}/>
        </RadarChart>
*/}
    </div>


    );
  }
}
