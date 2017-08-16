import React from 'react';
import PropTypes from 'prop-types';

function StopList (props) {
	return (
		<div>List of stops for each train</div>
	)
}
StopList.PropTypes = {
	stops: React.PropTypes.array.isRequired
};

export default StopList;