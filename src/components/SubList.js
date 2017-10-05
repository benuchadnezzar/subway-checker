import React from 'react';
import PropTypes from 'prop-types';

function SubList (props) {
	var subways = ['', '1', '2', '3', '4', '5', '6', 
	'S', 'A', 'C', 'E', 'B', 'D', 'F', 'M', 'N', 'Q', 'R', 'L', 'G']
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