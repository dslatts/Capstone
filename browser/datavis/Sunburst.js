import React from 'react';
import { arc } from 'd3-shape';
import { scaleLinear, scaleSqrt } from 'd3-scale';
import { hierarchy, partition } from 'd3-hierarchy';
import { select, selectAll} from 'd3-selection';
import {nest} from 'd3-collection';
import R from 'ramda';

export default class Sunburst extends React.Component{

  constructor(){
    super()
    this.state = {dummyData: [
  {key: 'song1', album: 'album1', artist: 'artist1', valence: 0.5, duration: 150},
  {key: 'song2', album: 'album1', artist: 'artist1', valence: 0.6, duration: 200},
  {key: 'song3', album: 'album1', artist: 'artist1', valence: 0.7, duration: 200},
  {key: 'song1', album: 'album2', artist: 'artist1', valence: 0.95, duration: 300},
  {key: 'song2', album: 'album2', artist: 'artist1', valence: 0.83, duration: 200},
  {key: 'song3', album: 'album2', artist: 'artist1', valence: 0.65, duration: 260},
  {key: 'song1', album: 'album2', artist: 'artist2', valence: 0.23, duration: 200},
  {key: 'song1', album: 'album1', artist: 'artist2', valence: 0.5, duration: 210},
  {key: 'song2', album: 'album1', artist: 'artist2', valence: 0.33, duration: 200},
  {key: 'song3', album: 'album1', artist: 'artist2', valence: 0.1, duration: 500},
  {key: 'song1', album: 'album1', artist: 'artist3', valence: 0.8, duration: 200}
]
}
  }

  componentDidMount(){
    createSunburst(this.state.dummyData)
  }
  render(){
    return(
      <div id='sunburst' />
    )
  }
}

//take all songs in history duration -> finds total duration
  //each song as a percentage of that duration
    //songs colored on a scale from blue to orange
        //border color = average
      //artists - color average valence of each song, duration- total duration for each song
    //albums
  //songs-




function createSunburst(input){
  let width = 500;
  let height = 500;
  let radius = (Math.min(width, height) / 2) - 10
  let pi2 = Math.PI * 2;  //180 degrees in radians

  function formatData(data) {
    //util function
    const renameKeys = R.curry((keysMap, obj) =>
    R.reduce((acc, key) => R.assoc(keysMap[key] || key, obj[key], acc), {}, R.keys(obj)));
    //put data into hierarchy nest
    let nestedData = nest()
      .key(d => d.artist)
      .key(d => d.album)
      .entries(data);

    //rename values to children so d3 can read correctly
    //get averages valence for each album + artist (not currently taking duration into account)
    //creates root object
    //refactor this redundancy
    let totalValences = [];

    nestedData.forEach(artist => {
      let artistValences = [];
      artist.values.forEach(album => {
        let albumValences = [];
        album.values.forEach(song => {
          albumValences.push(song.valence);
        });
        album.valence = R.mean(albumValences);
        artistValences.push(album.valence);
      })
      artist.valence = R.mean(artistValences);
      totalValences.push(artist.valence);
    })
    nestedData = nestedData.map(artist => {
      artist.values = artist.values.map(album => renameKeys({values: 'children'})(album));
      return renameKeys({values: 'children'})(artist);
    })

    let rootNode = {
      valence: R.mean(totalValences),
      children: nestedData
    }
    return rootNode
  }

  let root = hierarchy(formatData(input));
  root.sum(d => d.duration);

  let colorScale = scaleLinear()
  .domain([0, 0.25, 0.5, 0.75, 1])
  .range(['#5381E2', '#21ABB7', '#AAD64A', '#E8D129', '#F4B858'])

  let xScale = scaleLinear().range([0, pi2]);
  let yScale = scaleSqrt().range([0, radius]);
  let shape = arc()
    .startAngle(d => Math.max(0, Math.min(pi2, xScale(d.x0))))
    .endAngle(d => Math.max(0, Math.min(pi2, xScale(d.x1))))
    .innerRadius(d => Math.max(0, yScale(d.y0)))
    .outerRadius(d => Math.max(0, yScale(d.y1)))

  let chart = select('#sunburst')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2 },${height / 2})`)
  chart.selectAll('path')
    .data(partition()(root).descendants())
    .enter()
    .append('path')
    .attr('d', shape)
    .attr('fill', d => colorScale(d.data.valence))
    .style('stroke', 'black')
    .append('title')
    .text(d => d.data.key)
  }
