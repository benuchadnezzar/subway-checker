// We're controlling all of our state here and using children
// components only to return lists and handle AJAX calls.

import React, { Component } from 'react';
import SubList from './SubList';
import StopList from './StopList';
import { DelayN, DelayS } from './IsDelay';

class SubCheck extends Component {

  constructor (props) {
  	super(props);
  	this.state = {
  		selectedSub: null,
    	selectedStop: null,
    	stops: [],
  	};
  	this.handleSubSelect = this.handleSubSelect.bind(this);
  	this.handleStopSelect = this.handleStopSelect.bind(this);
	}

	// We want the user to be able to select their specific subway
	// stop, so obviously a different array of stops needs to be 
	// loaded for each subway. We're getting those from utils/stops.json.
	handleSubSelect(event) {
		var stopData = require('../utils/stops');
		var stopsArray = [];
		var sub = event.target.value
		for (var i = 0; i < stopData.length; i++) {
			var stop = stopData[i];

			if (String(stop.stop_id).charAt(0) === sub) {
				stopsArray.push(stop.stop_name);
			}
		}
		this.setState(() => {
			return {
				selectedSub: sub,
				stops: stopsArray
			}
		});
	}

	handleStopSelect(event) {
		this.setState({selectedStop: event.target.value});
	}

	render() {
		return (
			<div>
				<SubList onSubSelect={this.handleSubSelect}/>
				<StopList stops={this.state.stops} onStopSelect={this.handleStopSelect}/>
				<DelayN sub={this.state.selectedSub} stop={this.state.selectedStop}/>
				<DelayS sub={this.state.selectedSub} stop={this.state.selectedStop}/>
			</div>
		);
	}
}

export default SubCheck;