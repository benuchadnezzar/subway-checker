import React from 'react';
import {shallow} from 'enzyme';
import SubList from '../components/SubList';

let subSelectFn, wrapper;

beforeEach(() => {
	subSelectFn = jest.fn();
	wrapper = shallow(<SubList onSubSelect={subSelectFn}/>);
});

afterEach(() => {
	subSelectFn.mockReset();
});

it('should render a list of subways as an dropdown menu', () => {
	expect(wrapper.find('option').length).toBe(20);
});

it('should display the subway line in each `<option>` element', 
() => {
	const secondElement = wrapper.find('option').at(1);
	expect(secondElement.contains('1')).toEqual(true);
});

it('should call `props.onSubSelect` when an `option` is clicked', 
() => {
	// Expect that no calls have been made yet
	expect(subSelectFn.mock.calls.length).toEqual(0);

	// Click the <option>
	wrapper.find('select').simulate('change', '1');

	// Check that the function has been called
	expect(subSelectFn.mock.calls.length).toEqual(1);

	// Check that the function was called with the right arguments
	expect(subSelectFn.mock.calls[0][0]).toEqual('1');
});