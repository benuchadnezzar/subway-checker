import React from 'react';
import PropTypes from 'prop-types';
import { isDelayN, isDelayS } from '../utils/api';

function IsDelayN (props) {
	isDelayN(props.sub, props.stop);
	if (props.stop === null) {
		return (null);
	} else if (isDelayN.noDelay) {
		return (<p>The next train will arrive in {isDelayN.noDelay} minutes.</p>);
	} else if (isDelayN.yesDelay <= 10) {
		return (<p>A {isDelayN.yesDelay} delay isn't that big a deal, right?</p>);
	} else if (isDelayN.yesDelay > 10 && isDelayN.yesDelay <= 15) {
		return (<p>Oof, you've got a {isDelayN.yesDelay} minute delay. You should let your boss/friends/Tinder date know you're going to be late.</p>);
	} else {
		return (<p>So... The MTA's reporting a {isDelayN.yesDelay} minute delay for you right now. Tbh, wherever you're headed, you might as well call out sick.</p>);
	}
}

function IsDelayS (props) {
	isDelayS(props.sub, props.stop);
	if (props.stop === null) {
		return (null);
	} else if (isDelayS.noDelay) {
		return (<p>The next train will arrive in {isDelayS.noDelay} minutes.</p>);
	} else if (isDelayS.yesDelay <= 10) {
		return (<p>A {isDelayS.yesDelay} delay isn't that big a deal, right?</p>);
	} else if (isDelayS.yesDelay > 10 && isDelayN.yesDelay <= 15) {
		return (<p>Oof, you've got a {isDelayS.yesDelay} minute delay. You should let your boss/friends/Tinder date know you're going to be late.</p>);
	} else {
		return (<p>So... The MTA's reporting a {isDelayS.yesDelay} minute delay for you right now. Tbh, wherever you're headed, you might as well call out sick.</p>);
	}
}

export { IsDelayN, IsDelayS };