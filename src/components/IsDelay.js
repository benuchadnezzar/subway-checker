import React from 'react';
import PropTypes from 'prop-types';
import { IsDelayN, IsDelayS } from '../utils/api';

function DelayN (props) {
	if (props.stop === null) {
		return (null);
	}
	IsDelayN.isDelay(props.sub, props.stop);
	if (IsDelayN.noDelay) {
		return (<p>The next train will arrive in {IsDelayN.noDelay} minutes.</p>);
	} else if (IsDelayN.yesDelay <= 10) {
		return (<p>A {IsDelayN.yesDelay} delay isn't that big a deal, right?</p>);
	} else if (IsDelayN.yesDelay > 10 && IsDelayN.yesDelay <= 15) {
		return (<p>Oof, you've got a {IsDelayN.yesDelay} minute delay. You should let your boss/friends/Tinder date know you're going to be late.</p>);
	} else {
		return (<p>So... The MTA's reporting a {IsDelayN.yesDelay} minute delay for you right now. Tbh, wherever you're headed, you might as well call out sick.</p>);
	}
}

function DelayS (props) {
	if (props.stop === null) {
		return (null);
	}
	IsDelayS.isDelay(props.sub, props.stop);
	if (IsDelayS.noDelay) {
		return (<p>The next train will arrive in {IsDelayS.noDelay} minutes.</p>);
	} else if (IsDelayS.yesDelay <= 10) {
		return (<p>A {IsDelayS.yesDelay} delay isn't that big a deal, right?</p>);
	} else if (IsDelayS.yesDelay > 10 && IsDelayS.yesDelay <= 15) {
		return (<p>Oof, you've got a {IsDelayS.yesDelay} minute delay. You should let your boss/friends/Tinder date know you're going to be late.</p>);
	} else {
		return (<p>So... The MTA's reporting a {IsDelayS.yesDelay} minute delay for you right now. Tbh, wherever you're headed, you might as well call out sick.</p>);
	}
}

export { DelayN, DelayS };