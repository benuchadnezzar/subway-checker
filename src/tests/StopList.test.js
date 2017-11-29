import React from 'react';
import {shallow} from 'enzyme';
import StopList from '../components/StopList';

let mockStops, stopSelectFn, wrapper;

beforeEach(() => {
	mockStops = [1, 2, 3];
	stopSelectFn = jest.fn();
	wrapper = shallow(<StopList onStopSelect={stopSelectFn} stops={mockStops}/>);
});

afterEach(() => {
	stopSelectFn.mockReset();
});

it('should render a list of stops as a dropdown', () => {
	expect(wrapper.find('option').length).toEqual(mockStops.length);
});

it('should display the stop name in each `<option>` element', () => {
	const firstElement = wrapper.find('option').first();
	expect(firstElement.contains(mockStops[0])).toEqual(true);
});

it('should call `props.onStopSelect` when an `option` is clicked', 
() => {
	// Expect that no calls have been made yet
	expect(stopSelectFn.mock.calls.length).toEqual(0);

	// Click the <option>
	wrapper.find('select').simulate('change', 2);

	// Check that the function has been called
	expect(stopSelectFn.mock.calls.length).toEqual(1);

	// Check that the function was called with the right arguments
	expect(stopSelectFn.mock.calls[0][0]).toEqual(mockStops[1]);
});