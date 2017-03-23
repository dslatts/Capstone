import React, {Component} from 'react';
import HeaderContainer from '../containers/HeaderContainer';
export default class Profile extends Component {
constructor(props){
  super(props);
}
  render () {
    return (
    <div>
      <HeaderContainer />
      <img src={this.props.currentUser[3].images[0].url} />
      <p>{this.props.currentUser[3].display_name}</p>
    </div>);
  }
}
