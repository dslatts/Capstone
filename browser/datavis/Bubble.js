import React from 'react';
import { select } from 'd3-selection'

export default class Bubble extends React.Component {

  constructor(props){
    super(props)
    this.state = { x: 50, y: 50, opacity: 1, tooltip: 'none'}
    this.toggleTooltipOn = this.toggleTooltipOn.bind(this)
    this.toggleTooltipOff = this.toggleTooltipOff.bind(this)
  }

  selectNode(){
    return select(this.node)
  }

  toggleTooltipOn(event){
    event.preventDefault();
    this.setState({tooltip: 'block'});
  }
  toggleTooltipOff(event){
    event.preventDefault();
    this.setState({tooltip: 'none'});
  }

  render(){
    return (
      <g onMouseOver={this.toggleTooltipOn} onMouseOut={this.toggleTooltipOff} >
        <circle r={10} cx={this.props.x} cy={this.props.y} fill="orange" opacity={0.7} />
        <g className="tooltip" display={this.state.tooltip}>
        <rect x= {this.props.x + 5} y ={this.props.y - 5} width={250} height={100} fill="grey" />
        (tooltip:<text x= {this.props.x + 20} y ={this.props.y + 20}>
          <tspan>{this.props.d.name}</tspan>
          <tspan dy={15} x={this.props.x + 20}>{this.props.d.artists[0].name}</tspan>
          <tspan dy={15} x={this.props.x + 20}>{this.props.d.album}</tspan>
          <tspan dy={15} x={this.props.x + 20}>{this.props.d.audioFeatures[this.props.params[1]]}</tspan>
        </text>
        </g>
      </g>
    )
  }
}
