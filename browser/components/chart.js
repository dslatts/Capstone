const fakeData = [
  {
    name: song1,
    valence: 0.5,
    albumName:'Album 2',
    artist: 'Artist 3'
  },
  {
    name: song2,
    valence: 0.7,
    albumName: 'Album 2',
    artist: 'Artist 3'
  },
  {
    name: song3,
    valence: 0.4,
    albumName: 'Album 2',
    artist: 'Artist 3'
  },
  {
    name: song4,
    valence: 0.75,
    albumName: 'Album 2',
    artist: 'Artist 3'
  },
  {
    name: song5,
    valence: 0.8,
    albumName: 'Album 2',
    artist: 'Artist 3'
  },
  {
    name: song1,
    valence: 0.4,
    albumName: 'Album 1',
    artist: 'Artist 3'
  },
  {
    name: song2,
    valence: 0.45,
    albumName: 'Album 1',
    artist: 'Artist 3'
  },
  {
    name: song3,
    valence: 0.6,
    albumName: 'Album 1',
    artist: 'Artist 3'
  },
  {
    name: song4,
    valence: 0.9,
    albumName: 'Album 1',
    artist: 'Artist 3'
  }
]

// data is filtered into the single array as it changes in redux
//keeps d3 component dumb, lets it always treat same data the same way.
// the checkboxes on the component need to be persisted through the local state ()



let checked = ['valence']
let groupedBy = 'albums'

//basic d3 below

import * as d3 from 'd3';

function drawCanvas(data) {

  let xColorScale = d3.scale.linear()
    .domain([0, 1])
    .range(['#FA9F28', '#FC4AAF']);

  let yColorScale = d3.scale.linear()
    .domain([0, 1])
    .range(['#FA9F28', '#D4F400'])

  let songNodes = d3.selectAll('.song')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'song')
    .attr('r', 10)
    .attr('fill', 'pink')

}
let svgChart, songNodes;

let groups = []

//sets how data is currently grouped
function getGroups() {
  if (groupedBy === 'albums'){
    groups = d3.set(data.map(song => song.albumName))

  }
}

function createChart(h, w){
  svgChart = d3.select('#chart')
    .append('svg')
    .attr('height', h)
    .attr('width', w)
    //append svg grouping element
    .append('g')
    .attr('transform', 'translate(0,0')
}

function createForces(){
  //forces go here
}

function createCircles(data){
  songNodes = svgChart.selectAll('.song')
    .data(fakeData)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('fill', 'pink')
    .attr('class', 'song')
}

function createStackedForce(){
  let groupDomain = groupedBy
}

createChart(500, 500)

drawCanvas(fakeData);
