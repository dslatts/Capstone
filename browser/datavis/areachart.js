import React, {Component} from 'react';
import {VictoryChart, VictoryArea, VictoryLine, VictoryAxis, VictoryZoomContainer, VictoryBrushContainer} from 'victory';

//Two area charts

//creating a playlist

//x axis: Each time user is logged in (date)
//y axis: Average valence
export default class TimelineChart extends Component {

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
    const chartStyle = { parent: {minWidth: "100%", marginLeft: "10%"}};
    return (
      <div>
          <VictoryChart width={1500} height={500} style={chartStyle} scale={{x: "time"}} domain={{ y: [0, 1]}}
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
                this.props.currentUser.localProfile.histories.map(function(val, index){
                  return {x: new Date(val.date.slice(0, 4), val.date.slice(5, 7) - 1, val.date.slice(8, 10), val.date.slice(11, 13), val.date.slice(14, 16)),  y: val.valence}
                })
              }
            />

          </VictoryChart>

          <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={1500} height={200} style={chartStyle} domain={{ y: [0, 1]}} scale={{x: "time"}}
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
                this.props.currentUser.localProfile.histories.map(function(val, index){
                  return {x: new Date(val.date.slice(0, 4), val.date.slice(5, 7) - 1, val.date.slice(8, 10), val.date.slice(11, 13), val.date.slice(14, 16)),  y: val.valence}
                })
              }
            />
          </VictoryChart>

      </div>
    );
  }
}