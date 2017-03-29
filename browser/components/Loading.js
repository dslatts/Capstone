import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class Loading extends Component {
constructor(props){
  super(props);
}
componentWillReceiveProps(){
    browserHistory.push('/');
}

render(){
  console.log(this.props);
  return (
    <div id="loadingScreen">
      <div className="icon is-large">
        <i className="fa fa-cog fa-spin fa-fw" />
      </div>
      <p>Loading...</p>
    </div>);
  }
}


