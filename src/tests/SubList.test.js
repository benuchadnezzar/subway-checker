import React from 'react';
import {shallow} from 'enzyme';
import SubList from '../components/SubList';

let mockSubways, wrapper, subSelectFn;

// Creates fixture (I think this is a fixture? It's definitely
// a set of props, mock function, and shallow rendering) for 
// each test
beforeEach(() => {

	mockSubways = [
		{id: 1, name: 'Mock Subway 1'},
		{id: 2, name: 'Mock Subway 2'},
		{id: 3, name: 'Mock Subway 3'},
	];

	subSelectFn = jest.fn();

	wrapper = shallow(
		<SubList 
			subways={mockSubways}
			onSubSelect={subSelectFn}
		/>
	);
});

afterEach(() => {
	subSelectFn.mockReset();
});

it('should render a list of subways as an dropdown menue', () => {
	expect(wrapper.find('option').length).toEqual(mockSubways.length);
});

it('should display the subway line in each `<option>` element', 
() => {
	const firstElement = wrapper.find('option').first();
	expect(firstElement.contains(mockSubways[0].name)).toEqual(true);
});

it('should call `props.onSubSelect` when an `option` is clicked', 
() => {
	const firstElement = wrapper.find('option').first();
	
	// Expect that no calls have been made yet
	expect(subSelectFn.mock.calls.length).toEqual(0);

	// Click the <option>
	firstElement.simulate('click');

	// Check that the function has been called
	expect(subSelectFn.mock.calls.length).toEqual(1);

	// Check that the function was called with the right arguments
	expect(subSelectFn.mock.calls[0][0]).toEqual(mockSubways[0]);
});