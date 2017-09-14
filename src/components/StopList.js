import React from 'react';
import PropTypes from 'prop-types';

function StopList (props) {
	return (
		<select>
			{
				props.stops.map(stop =>
					<option key={stop} onClick={() => props.onStopSelect(stop)}>
						{stop}
					</option>
				)
			}
		</select>
	)
}
StopList.PropTypes = {
	stops: React.PropTypes.array.isRequired,
	onStopSelect: React.PropTypes.func.isRequired
};

export default StopList;