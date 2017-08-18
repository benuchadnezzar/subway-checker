// This is the component where state will live and all other
// components will interact

import React, { Component } from 'react';
import SubList from './SubList';
import StopList from './StopList';

class SubCheck extends Component {

  constructor (props) {
  	super(props);
  	this.state = {
  		subways: [
				{id: 1, name: 'L'},
				{id: 2, name: 'M'},
				{id: 3, name: 'G'},
  		],
    	stops: [
				{id: 1, name: 'Lorimer'},
				{id: 2, name: 'Graham'},
				{id: 3, name: 'Grand'},
  		]
  	};
  	this.handleSubSelect.bind(this);
	}

	handleSubSelect(event) {
		this.setState({selectedSub:event.target.selectedSub});
	}

	render() {
		return (
			<div>
				<SubList subways={this.state.subways}
				onSubSelect={this.handleSubSelect.bind(this)}/>
				<StopList stops={this.state.stops}/>
			</div>
		);
	}
}

export default SubCheck;