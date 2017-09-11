import React from 'react';
import {shallow} from 'enzyme';
import StopList from '../components/StopList';

let mockStops, wrapper;

beforeEach(() => {
	mockStops = [1, 2, 3];
	wrapper = shallow(<StopList stops={mockStops}/>);
});

it('should render a list of stops as a dropdown', () => {
	expect(wrapper.find('option').length).toEqual(mockStops.length);
});

it('should display the stop name in each `<option>` element', () => {
	const firstElement = wrapper.find('option').first();
	expect(firstElement.contains(mockStops[0])).toEqual(true);
});
