import React from 'react';
import PropTypes from 'prop-types';

function SubList (props) {
	return (
		<div>List of trains</div>
	)
}
SubList.PropTypes = {
	subways: React.PropTypes.array.isRequired
};

export default SubList;