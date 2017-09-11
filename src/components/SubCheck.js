// We're controlling all of our state here and using children
// components only to return lists and handle AJAX calls.

import React, { Component } from 'react';
import SubList from './SubList';
import StopList from './StopList';

class SubCheck extends Component {

  constructor (props) {
  	super(props);
  	this.state = {
  		selectedSub: '--',
    	selectedStop: null,
    	stops: ['--'],
  	};
  	this.handleSubSelect.bind(this);
  	this.handleStopSelect.bind(this);
	}

	// We want the user to be able to select their specific subway
	// stop, so obviously a different array of stops needs to be 
	// loaded for each subway. We're getting those from utils/stops.json.
	componentWillReceiveProps(nextProps) {
		var stopData = require('../utils/stops');
		var stopsArray = [];
		var newSub = nextProps.selectedSub
		for(var i = 0; i < stopData.length; i++) {
			var stop = stopData[i];

			if (stop.stop_id.charAt(0) === this.state.selectedSub) {
				stopsArray.push(stop.stop_name);
			}
		}
		if (stopsArray.length !== 0 && newSub !== this.state.selectedSub) {
			this.setState({stops: stopsArray});
		}
	}

	handleSubSelect(event) {
		this.setState({selectedSub:event.target.selectedSub});
	}

	handleStopSelect(event) {
		this.setState({selectedStop:event.target.selectedStop})
	}

	render() {
		return (
			<div>
				<SubList onSubSelect={this.handleSubSelect.bind(this)}/>
				<StopList stops={this.state.stops} onStopSelect={this.handleStopSelect.bind(this)}/>
			</div>
		);
	}
}

export default SubCheck;