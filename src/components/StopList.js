/*Component that renders an unordered list of subway stops
pulled from the MTA's API*/

import React from 'react';
import PropTypes from 'prop-types';

function StopList (props) {
	return (
		<ul>
			{
				props.stops.map(stop =>
					<li key={stop.id}>
						{stop.name}
					</li>
				)
			}
		</ul>
	)
}
StopList.PropTypes = {
	stops: React.PropTypes.array.isRequired
};

export default StopList;