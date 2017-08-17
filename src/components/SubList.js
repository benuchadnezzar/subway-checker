/*Component that renders an unordered list of subway lines
pulled from the MTA's API*/

import React from 'react';
import PropTypes from 'prop-types';

function SubList (props) {
	return (
		<ul>
			{
				props.subways.map(subway =>
					<li key={subway.id}>
						{subway.name}
					</li>
				)
			}
		</ul>
	)
}
SubList.PropTypes = {
	subways: React.PropTypes.array.isRequired
};

export default SubList;