import React from 'react';
import {shallow} from 'enzyme';
import ReverseStopMock from '../mocks/ReverseStopMock';
import IsDelayMock from '../mocks/IsDelayMock';

it('displays the correct stop id for stopIdN', () => {
	expect(ReverseStopMock.stopIdN).toBe('L10N');
});

it('displays the correct stop id for stopIdS', () => {
	expect(ReverseStopMock.stopIdS).toBe('L10S');
});

