import React from 'react';
import {shallow} from 'enzyme';
import express from 'express';
import { getFeedId, getFeedData, reverseStop, isDelay } from '../mocks/apiMock';
// import ReverseStopMock from '../mocks/ReverseStopMock';
// import IsDelayMock from '../mocks/IsDelayMock';
// import { IsDelayN, IsDelayS } from '../mocks/apiMock';

const app = express();
app.use(express.static('../mocks/MockData.json'));

it('returns the expected feed id for a given subway line', () => {
	expect(getFeedId('L')).toBe(2);
});

it('returns json data', (done) => {
	app.listen(4000, function () {
		expect.assertions(2);
		return getFeedData('L').then((data) => {
			expect(data).toBeDefined();
			expect(data.header.gtfs_realtime_version).toBe('1.0');
		});
	});
	done();
});

it('returns a stop_id for a given subway line and stop', () => {
	expect(reverseStop('L', 'Lorimer St')).toBe('L10N');
});

it('returns either the delay or time until the next train' , (done) => {
	app.listen(4000, function () {
		isDelay('L', 'Lorimer St');
	});
	done();
});

// it('displays the correct stop id for stopIdN', () => {
// 	expect(ReverseStopMock.stopIdN).toBe('L10N');
// });

// it('displays the correct stop id for stopIdS', () => {
// 	expect(ReverseStopMock.stopIdS).toBe('L10S');
// });

// it('populates the array of arrivals', () => {
// 	expect(IsDelayMock.arrivals).toBeDefined;
// });

// it('allows you to call noDelay when there is not a delay', () => {
// 	expect(IsDelayMock.noDelay).toBeTruthy;
// });

// it('does not allow you to call yesDelay because there is not a delay', () => {
// 	expect(IsDelayMock.yesDelay).toBeFalsy;
// });

// it('correctly takes input at beginning of api logic and outputs expected values at end', () => {
// 	IsDelayN.isDelay('L', 'Lorimer St');
// 	IsDelayS.isDelay('L', 'Lorimer St');
// 	console.log('IsDelayN noDelay: ' + IsDelayN.noDelay);
// 	console.log('IsDelayN nextArrival: ' + IsDelayN.nextArrival);
// 	console.log('IsDelayN delay: ' + IsDelayN.delay);
// 	console.log('IsDelayS noDelay: ' + IsDelayS.noDelay);
// 	console.log('IsDelayS nextArrival: ' + IsDelayS.nextArrival);
// 	console.log('IsDelayS delay: ' + IsDelayS.delay);
// 	expect(IsDelayN.noDelay).toBeTruthy();
// 	expect(IsDelayN.yesDelay).toBeFalsy();
// 	expect(IsDelayS.noDelay).toBeTruthy();
// 	expect(IsDelayS.yesDelay).toBeFalsy();
// });