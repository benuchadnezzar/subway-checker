/*This is the component where state will live and all other
components will interact*/

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
  	}
	}

	render() {
		return (
			<div>
				<SubList subways={this.state.subways}/>
				<StopList stops={this.state.stops}/>
			</div>
		);
	}
}

export default SubCheck;