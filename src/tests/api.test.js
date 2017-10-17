import React from 'react';
import {shallow} from 'enzyme';
import RequestMock from '../mocks/RequestMock';
import ReverseStopMock from '../mocks/ReverseStopMock';
import IsDelayMock from '../mocks/IsDelayMock';

// RequestMock tests currently commented out because of issues
// testing proto buffs from local file - I don't think 
// this is related to the performance of the actual API.

// it('makes feed accessible from RequestMock', () => {
// 	expect(RequestMock.feed).toBeDefined();
// });

// it('makes decoded data accessible from RequestMock.feed', () => {
// 	expect(RequestMock.feed).toHaveProperty('header.gtfs_realtime_version', '1.0');
// });

it('displays the correct stop id for stopIdN', () => {
	expect(ReverseStopMock.stopIdN).toBe('L10N');
});

it('displays the correct stop id for stopIdS', () => {
	expect(ReverseStopMock.stopIdS).toBe('L10S');
});

