import React from 'react';
import {shallow} from 'enzyme';
import {RequestMock} from '../mocks/RequestMock';
import ReverseStopMock from '../mocks/ReverseStopMock';
import IsDelayMock from '../mocks/IsDelayMock';

it('makes feed accessible from RequestMock', () => {
	RequestMock().then(function (feed) {
		expect(feed.feed).toBeDefined();
	})
});

it('makes decoded data accessible from RequestMock.feed', () => {
	RequestMock().then(function (feed) {
		expect(feed.feed).toHaveProperty('header.gtfs_realtime_version', '1.0');
	})
});

it('displays the correct stop id for stopIdN', () => {
	expect(ReverseStopMock.stopIdN).toBe('L10N');
});

it('displays the correct stop id for stopIdS', () => {
	expect(ReverseStopMock.stopIdS).toBe('L10S');
});