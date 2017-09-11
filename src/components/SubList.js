import React from 'react';
import PropTypes from 'prop-types';

function SubList (props) {
	const subways = ['--', '1', '2', '3', '4', '5', '6', 'S', 'C',
	'B', 'D', 'N', 'Q', 'R', 'L']
	return (
		<select>
			{
				subways.map(sub =>
					<option key={sub} onClick={() => props.onSubSelect(sub)}>
						{sub}
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