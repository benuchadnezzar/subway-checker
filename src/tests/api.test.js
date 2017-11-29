import React from 'react';
import {shallow} from 'enzyme';
import ReverseStopMock from '../mocks/ReverseStopMock';
import IsDelayMock from '../mocks/IsDelayMock';
import { IsDelayN, IsDelayS } from '../mocks/apiMock';

it('displays the correct stop id for stopIdN', () => {
	expect(ReverseStopMock.stopIdN).toBe('L10N');
});

it('displays the correct stop id for stopIdS', () => {
	expect(ReverseStopMock.stopIdS).toBe('L10S');
});

it('populates the array of arrivals', () => {
	expect(IsDelayMock.arrivals).toBeDefined;
});

it('allows you to call noDelay when there is not a delay', () => {
	expect(IsDelayMock.noDelay).toBeTruthy;
});

it('does not allow you to call yesDelay because there is not a delay', () => {
	expect(IsDelayMock.yesDelay).toBeFalsy;
});

it('correctly takes input at beginning of api logic and outputs expected values at end', () => {
	IsDelayN.isDelay('L', 'Lorimer St');
	IsDelayS.isDelay('L', 'Lorimer St');
	console.log('IsDelayN noDelay: ' + IsDelayN.noDelay);
	console.log('IsDelayN nextArrival: ' + IsDelayN.nextArrival);
	console.log('IsDelayN delay: ' + IsDelayN.delay);
	console.log('IsDelayS noDelay: ' + IsDelayS.noDelay);
	console.log('IsDelayS nextArrival: ' + IsDelayS.nextArrival);
	console.log('IsDelayS delay: ' + IsDelayS.delay);
	expect(IsDelayN.noDelay).toBeTruthy();
	expect(IsDelayN.yesDelay).toBeFalsy();
	expect(IsDelayS.noDelay).toBeTruthy();
	expect(IsDelayS.yesDelay).toBeFalsy();
});