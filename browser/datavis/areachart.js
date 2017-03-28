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
    const userHistory = this.props.currentUser.localProfile.histories.map(function(val, index){
                  return {x: index + 1, y: val.valence}
                })
    console.log(userHistory);
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }

  render() {
    let myArr = [];
    let axisTicker = 5;
    let axisLength = Math.round(this.props.currentUser.localProfile.histories.length/5)
    console.log(axisLength)
    const makeAxisValues = function(){
      for (var i = 0; i < axisLength; i++) {
        myArr.push(axisTicker)
        axisTicker += 5;
      }
    }
    makeAxisValues();
    console.log(myArr)
    const chartStyle = { parent: {minWidth: "100%", marginLeft: "10%"}};
    return (
      <div>
          <VictoryChart width={1000} height={400} style={chartStyle} domain={{x: [1, this.props.currentUser.localProfile.histories.length], y: [0, 1]}}
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
                  return {x: index + 1, y: val.valence}
                })
              }
            />

          </VictoryChart>

          <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={1000} height={100} style={chartStyle} domain={{x: [1, this.props.currentUser.localProfile.histories.length], y: [0, 1]}}
            containerComponent={
              <VictoryBrushContainer responsive={false}
                dimension="x"
                selectedDomain={this.state.selectedDomain}
                onDomainChange={this.handleBrush.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickValues={
                myArr
              }
              //tickFormat={(x) => new Date(x).getFullYear()}
            />
            <VictoryArea
              style={{
                data: {stroke: "tomato"}
              }}
              data={
                this.props.currentUser.localProfile.histories.map(function(val, index){
                  return {x: index + 1, y: val.valence}
                })
              }
            />
          </VictoryChart>

      </div>
    );
  }
}



//playlist chart