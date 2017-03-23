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
    valence: 0.1,
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
    valence: 0.3,
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
    name: 'song3',
    valence: 0,
    albumName: 'Album 3',
    artist: 'Artist 2'
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
  let svgChart, songNodes, simulation;

  let height = 500;
  let width = 700;
  let radius = 10;
  let di = radius * 2

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

  let forces = {stacked: createStackedForce()};

  //scales
    //ordinal scale
  let xScale = d3.scaleBand()
  .domain(groups.values())
  .range([di, width - di])
  .padding(0.25)

  //continuous scale
  let yScale = d3.scaleLinear()
  .range([height - di, di])

  let xColorScale = d3.scaleLinear()
    .domain([0, 1])
    .range(['#FA9F28', '#FC4AAF']);

  let yColorScale = d3.scaleLinear()
    .domain([0, 1])
    .range(['#FA9F28', '#D4F400'])


function createChart(){
  svgChart = d3.select('#chart')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
}

  function createCircles(){
    songNodes = svgChart.selectAll('.song')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', radius)
    .attr('fill', 'pink')
    .attr('class', 'song')
  }

  function createStackedForce(){
    return {
      x: d3.forceX(function(d) {
        return xScale(d.albumName) + (xScale.bandwidth() / 2)
      }).strength(0.99),
      y: d3.forceY(function(d){
        return yScale(d.valence)
      }).strength(0.99)
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
        .attr('transform', 'translate(0,-30)')
    })
  }

  function createAxes(){
    let ticks = 10
    let format = '0.1f'

    let xAxis = d3.axisBottom(xScale)
      .ticks(ticks, format)

    let yAxis = d3.axisLeft(yScale)
      .ticks(ticks, format);

    svgChart.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - 30})`)
      .call(xAxis)
      .selectAll('.tick text')
        .attr('font-size', '16px')

    svgChart.append("g")
          .attr("class", "y-axis")
          .attr("transform", "translate(30, -30)")
          .call(yAxis);
  }


  createChart()
  createStackedForce()
  createForceSimulation()
  createCircles(data)
  createAxes()
}

drawCanvas(fakeData);
