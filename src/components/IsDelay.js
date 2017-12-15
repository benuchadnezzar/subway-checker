import React from 'react';
import PropTypes from 'prop-types';
import { isDelayN, isDelayS } from '../utils/api';

function DelayN (props) {
	if (props.stop === null) {
		return (null);
	} else if (typeof isDelayN(props.sub, props.stop).then === 'function') {
		return isDelayN(props.sub, props.stop).then((data) => {
			return (<p>The next northbound train is coming in {data} minutes</p>);
		});
	} else if (isDelayN(props.sub, props.stop) <= 10) {
		return (<p>Ok, a {isDelayN(props.stop, props.sub)} minute delay on the northbound train isn't so bad, right?</p>)
	} else if (isDelayN(props.sub, props.stop) > 10 && isDelayN(props.sub, props.stop) <= 15) {
		return (<p>Oof, you've got a {isDelayN(props.sub, props.stop)} minute delay. You should let your boss/friends/Tinder date know you're going to be late.</p>);
	} else {
		return (<p>So... The MTA's reporting a {isDelayN(props.sub, props.stop)} minute delay for you right now. Tbh, wherever you're headed, you might as well call out sick.</p>);
	}
}

function DelayS(props) {
	if (props.stop === null) {
		return (null);
	} else if (typeof isDelayS(props.sub, props.stop).then === 'function') {
		return isDelayS(props.sub, props.stop).then((data) => {
			return (<p>The next northbound train is coming in {data} minutes</p>);
		});
	} else if (isDelayS(props.sub, props.stop) <= 10) {
		return (<p>Ok, a {isDelayS(props.stop, props.sub)} minute delay on the northbound train isn't so bad, right?</p>)
	} else if (isDelayS(props.sub, props.stop) > 10 && isDelayS(props.sub, props.stop) <= 15) {
		return (<p>Oof, you've got a {isDelayS(props.sub, props.stop)} minute delay. You should let your boss/friends/Tinder date know you're going to be late.</p>);
	} else {
		return (<p>So... The MTA's reporting a {isDelayS(props.sub, props.stop)} minute delay for you right now. Tbh, wherever you're headed, you might as well call out sick.</p>);
	}
}

export { DelayN, DelayS };