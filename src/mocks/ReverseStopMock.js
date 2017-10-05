const stop = 'Lorimer St';

function reverseStop (stop) {
	var stopData = require('../utils/stops');
	var invalidEntries = 0;
	var stopIdN;
	var stopIdS;
	function filterByName (item) {
		if (item.stop_name == stop) {
			return true;
		}
		invalidEntries++;
		return false;
	}
	var stopObjs = stopData.filter(filterByName);
	for (i = 0; i < stopObjs.length; i++) {
		if (i.stop_id.charAt(-1) == 'N') {
			stopIdN = stopObjs[i].stop_id;
		} else if (i.stop_id.charAt(-1) == 'S') {
			stopIdS = stopObjs[i].stop_id;
		}
	}
	return {
		stopIdN: stopIdN,
		stopIdS: stopIdS
	};
}

export default ReverseStopMock;