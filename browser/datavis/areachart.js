import React, {Component} from 'react';
import {VictoryChart, VictoryArea, VictoryLine, VictoryAxis, VictoryZoomContainer, VictoryBrushContainer} from 'victory';

//Two area charts

//creating a playlist

//x axis: Each time user is logged in (date)
//y axis: Average valence
export default class AreaChart extends Component {

  constructor(props) {
    super(props);
    this.state = {};

  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    const sortedHistories = this.props.currentUser.localProfile.histories.slice().sort((a,b) => a.id - b.id);
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    const chartStyle = { parent: {minWidth: "100%", marginLeft: "10%"}};
    return (
      <div>
          <VictoryChart width={windowWidth * .80} height={windowHeight * .50} style={chartStyle} scale={{x: "time"}} domain={{ y: [0, 1]}}
            containerComponent={
              <VictoryZoomContainer responsive={false}
                dimension="x"
                zoomDomain={this.state.zoomDomain}
                onDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryArea
              style={{
                data: {stroke: "tomato"}
              }}
              data={
                sortedHistories.map(function(val, index){
                  return {x: new Date(val.date.slice(0, 4), val.date.slice(5, 7) - 1, val.date.slice(8, 10), val.date.slice(11, 13), val.date.slice(14, 16)),  y: val.valence}
                })
              }
            />

          </VictoryChart>

          <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={windowWidth * .80} height={windowHeight * .10} style={chartStyle} domain={{ y: [0, 1]}} scale={{x: "time"}}
            containerComponent={
              <VictoryBrushContainer responsive={false}
                dimension="x"
                selectedDomain={this.state.selectedDomain}
                onDomainChange={this.handleBrush.bind(this)}
              />
            }
          >
            <VictoryArea
              style={{
                data: {stroke: "tomato"}
              }}
              data={
                sortedHistories.map(function(val, index){
                  return {x: new Date(val.date.slice(0, 4), val.date.slice(5, 7) - 1, val.date.slice(8, 10), val.date.slice(11, 13), val.date.slice(14, 16)),  y: val.valence}
                })
              }
            />
          </VictoryChart>
      </div>
    );
  }
}
