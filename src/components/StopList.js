import React from 'react';
import PropTypes from 'prop-types';

function StopList (props) {
	return (
		<select>
			{
				props.stops.map((stop) =>
					<option key={stop}>
						{stop}
					</option>
				)
			}
		</select>
	)
}
StopList.PropTypes = {
	stops: React.PropTypes.array.isRequired
};

export default StopList;