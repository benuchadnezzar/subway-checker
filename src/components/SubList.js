// Component that renders an unordered list of subway lines
// pulled from the MTA's API

import React from 'react';
import PropTypes from 'prop-types';

function SubList (props) {
	const subways = ['', '1', '2', '3', '4', '5', '6', 
	'S', 'C', 'B', 'D', 'N', 'Q', 'R', 'L']
	return (
		<select onChange={props.onSubSelect}>
			{
				subways.map(subway =>
					<option key={subway}>
						{subway}
					</option>
				)
			}
		</select>
	)
}
SubList.PropTypes = {
	onSubSelect: React.PropTypes.func.isRequired
};

export default SubList;