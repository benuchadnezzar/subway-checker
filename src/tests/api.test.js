import subOnTime from '../utils/api';

var sub = 'L';
var stop = 'Lorimer St'

it('should load train data', () => {
	return subOnTime
		.then(data => {
			expect(data).toBeDefined()
		})
})