import React from 'react';
import {shallow} from 'enzyme';
import StopList from '../components/StopList';

// Tests that the props passed to StopList render as an unordered list
it('should render a list of subway stops as an unordered list', () => {
	const mockStops = [
		{id: 1, name: 'Mock stop 1'},
		{id: 2, name: 'Mock stop 2'},
		{id: 3, name: 'Mock stop 3'},
	];
	const wrapper = shallow(<StopList stops={mockStops}/>);
	expect(wrapper.find('li').length).toEqual(mockStops.length);
});