import React from 'react';
import {shallow} from 'enzyme';
import SubList from '../components/SubList';

// Tests that the props passed to SubList render as an unordered list
it('should render a list of subways as an unordered list', () => {
	const mockSubways = [
		{id: 1, name: 'Mock Subway 1'},
		{id: 2, name: 'Mock Subway 2'},
		{id: 3, name: 'Mock Subway 3'},
	];
	const wrapper = shallow(<SubList subways={mockSubways}/>);
	expect(wrapper.find('li').length).toEqual(mockSubways.length);
});