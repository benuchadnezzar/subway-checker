import React from 'react';
import PropTypes from 'prop-types';

function StopList (props) {
	return (
		<select onChange={props.onStopSelect}>
			{
				props.stops.map(stop =>
					<option key={stop}>
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