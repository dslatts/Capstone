import React from 'react';
import { transition } from 'd3-transition'
import { easeCubicInOut } from 'd3-ease'
import { select } from 'd3-selection'

export default class Bubble extends React.Component {

  constructor(props){
    super(props)
    this.state = { x: 50, y: 50, opacity: 1 }
    this.transition = transition().duration(750).ease(easeCubicInOut);
    this.selectNode = this.selectNode.bind(this);
  }

  selectNode(){
    return select(this.node)
  }

  // componentWillEnter(func){
  //   //enter transition

  //   let node = this.selectNode();
  //   this.setState({x: this.props.x})
  //   node.transition(this.transition)
  //     .attr('cx', this.props.x)
  //     .attr('cy', this.props.y)
  //     .attr('opacity', 0.6)
  //     .on('end', () => {
  //       this.setState({y: this.props.y, opacity: 0.6});
  //       func();
  //     });
  // }

  // componentWillLeave(func){
  //   //exit transition

  //   let node = this.selectNode();
  //   this.setState({className: 'exit'})
  //   node.transition(this.transition)
  //     .attr('cy', -60)
  //     .attr('opacity', 0)
  //     .on('end', () => {
  //       func();
  //     });
  // }

  // componentWillReceiveProps(nextProps){
  //   if (this.props !== nextProps){
  //     //update transition
  //     let node = this.selectNode();
  //     node.transition(this.transition)
  //       .attr('cx', this.props.x)
  //       .attr('cy', this.props.y)
  //   }
  // }

  render(){
    return (
    <circle r={5} cx={this.props.x} cy={this.props.y} fill="orange" opacity={0.6}/>
    )
  }
}
