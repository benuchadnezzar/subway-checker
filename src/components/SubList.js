// Component that renders an unordered list of subway lines
// pulled from the MTA's API

import React from 'react';
import PropTypes from 'prop-types';

function SubList (props) {
	return (
		<select>
			{
				props.subways.map(subway =>
					<option key={subway.id} onClick={() => props.onSubSelect(subway)}>
						{subway.name}
					</option>
				)
			}
		</select>
	)
}
SubList.PropTypes = {
	subways: React.PropTypes.array.isRequired,
	onSubSelect: React.PropTypes.func.isRequired
};

export default SubList;