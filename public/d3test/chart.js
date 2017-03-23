const fakeData = [
  {
    name: 'song1',
    valence: 0.5,
    albumName:'Album 2',
    artist: 'Artist 3'
  },
  {
    name: 'song2',
    valence: 0.7,
    albumName: 'Album 2',
    artist: 'Artist 3'
  },
  {
    name: 'song3',
    valence: 0.4,
    albumName: 'Album 2',
    artist: 'Artist 3'
  },
  {
    name: 'song4',
    valence: 0.75,
    albumName: 'Album 2',
    artist: 'Artist 3'
  },
  {
    name: 'song5',
    valence: 0.8,
    albumName: 'Album 2',
    artist: 'Artist 3'
  },
  {
    name: 'song1',
    valence: 0.4,
    albumName: 'Album 1',
    artist: 'Artist 3'
  },
  {
    name: 'song2',
    valence: 0.45,
    albumName: 'Album 1',
    artist: 'Artist 3'
  },
  {
    name: 'song3',
    valence: 0.6,
    albumName: 'Album 1',
    artist: 'Artist 3'
  },
  {
    name: 'song4',
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

// const d3 = require('d3');

function drawCanvas(data) {
  let svgChart, songNodes, forces, simulation;

  // let groups = () => {
  //   if (groupedBy === 'albums'){
  //     return d3.set(data.map(song => song.albumName))
  //   }
  //   if (groupedBy === 'artists'){
  //     return d3.set(data.map(song => song.artist))
  //   }
  //   if (groupedBy === 'playlists'){
  //     return d3.set(data.map(song => song.playlistName))
  //   }
  // }

  let groups = d3.set(data.map(song => song.albumName))

  forces = {stacked: createStackedForce()};

  let xColorScale = d3.scaleLinear()
    .domain([0, 1])
    .range(['#FA9F28', '#FC4AAF']);

  let yColorScale = d3.scaleLinear()
    .domain([0, 1])
    .range(['#FA9F28', '#D4F400'])


function createChart(h, w){
  svgChart = d3.select('#chart')
    .append('svg')
    .attr('height', h)
    .attr('width', w)
    //append svg grouping element
    .append('g')
    .attr('transform', 'translate(0,0)')
}

  function createCircles(){
    songNodes = svgChart.selectAll('.song')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('fill', 'pink')
    .attr('class', 'song')
  }

  function createStackedForce(){
    let groupDomain = groups.values()

    //ordinal scale
    let xScale = d3.scaleBand()
    .domain(groupDomain)
    .range([0, 500])
    .padding(0.5)

    //continuous scale
    let yScale = d3.scaleLinear()
    .range([0, 500])

    return {
      x: d3.forceX(function(d) {
        return xScale(d.albumName)
      }).strength(0.05),
      y: d3.forceY(function(d){
        return yScale(d.valence)
      }).strength(0.05)
    }
  }

  function createForceSimulation(){
    simulation = d3.forceSimulation()
    .force('x', forces.stacked.x)
    .force('y', forces.stacked.y)

  simulation.nodes(data)
    .on('tick', function(){
      songNodes
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
    })
}

  createChart(500, 500)
  createCircles(data)
  createStackedForce()
  createForceSimulation()
}

drawCanvas(fakeData);
