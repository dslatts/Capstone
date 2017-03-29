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

  componentWillEnter(func){
    //enter transition

    let node = this.selectNode();
    this.setState({x: this.props.x})
    node.transition(this.transition)
      .attr('cx', this.props.x)
      .attr('cy', this.props.y)
      .attr('opacity', 0.6)
      .on('end', () => {
        this.setState({y: this.props.y, opacity: 0.6});
        func();
      });
  }

  componentWillLeave(func){
    //exit transition

    let node = this.selectNode();
    this.setState({className: 'exit'})
    node.transition(this.transition)
      .attr('cy', -60)
      .attr('opacity', 0)
      .on('end', () => {
        func();
      });
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps){
      //update transition
      let node = this.selectNode();
      node.transition(this.transition)
        .attr('cx', this.props.x)
        .attr('cy', this.props.y)
    }
  }

  render(){
    return (
    <circle r={5} cx={this.props.x} cy={this.props.y} fill="orange" opacity={0.7} />
    )
  }
}


//chart type:
// renders conditionally, changes based on buttons clicked
//
/*

#00AAAA
  scales are created on chart page?
  where do we create the scales- should be on the page.
  where do we create the groups


  currently I am blocked because I have to wait for the component to get state, and it is trying to render the components before it has the state it needs
  if we can prevent the components from breaking out in d3 we can stop them from

  Stacked Chart- buttons logic
  Scatter Plot- fix button logic
  -bubble charts on hovers
  -axes
  -color map
  -styling
  -transitions to work

  -styling so it's not ugly


  about rendering x and y coordinates

  need to grab a song->
  state current song lists gets changed
  ->state is changed, songs groups sets are worked
  I really just don't work on d3 right now


  Sunburst- on hovers



*/
