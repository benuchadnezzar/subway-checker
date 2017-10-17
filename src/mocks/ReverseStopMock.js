const stop = 'Lorimer St';
const sub = 'L';

var ReverseStopMock = (function (stopIdN, stopIdS) {
	var stopData = require('../utils/stops');
	var invalidEntries = 0;
	function filterByName (item) {
		if (item.stop_name == stop && item.stop_id.charAt(0) == sub) {
			return true;
		}
		invalidEntries++;
		return false;
	}
	var stopObjs = stopData.filter(filterByName);
	for (var i = 0; i < stopObjs.length; i++) {
		if (stopObjs[i].stop_id.charAt(stopObjs[i].stop_id.length - 1) == 'N') {
			stopIdN = stopObjs[i].stop_id;
		} else if (stopObjs[i].stop_id.charAt(stopObjs[i].stop_id.length - 1) == 'S') {
			stopIdS = stopObjs[i].stop_id;
		}
	}
	return {
		stopIdN: stopIdN,
		stopIdS: stopIdS
	};
})();

export default ReverseStopMock;