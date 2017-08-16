import React, { Component } from 'react';
import SubList from './SubList';
import StopList from './StopList';

class SubCheck extends Component {
	render() {
		return (
			<div>
				<SubList />
				<StopList />
			</div>
		);
	}
}

export default SubCheck;