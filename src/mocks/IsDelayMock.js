function reverseStop () {
	return { stopId: 'L03N'};
}

function getFeedData () {
	var feed = require('./MockData');
	return { feed: feed };
}

var IsDelayMock = function () {
	var arrivals = [];
	var delays = [];
	reverseStop();
	getFeedData()
		function dataFilter () {
			var invalidEntries = 0;
			var feedObjs = getFeedData.feed.filter(function (feedObj) {
				if (feedObj.entity.trip_update.stop_time_update.stop_id == reverseStop.stopId) {
					return feedObj.entity.trip_update.stop_time_update;
				}
			});
			for (var i = 0; i < feedObjs.length; i++) {
				arrivals.push(feedObjs.arrival.time.low);
				delays.push(feedObjs.arrival.delay);
			}
		}
	var nextArrival = Math.min(...arrivals);
	var delayIndex = arrivals.findIndexOf(nextArrival);
	var delay = delays.delayIndex;
	if (delay === null || Math.ceil(delay / 60) <= 5) {
		var noDelay = Math.ceil((nextArrival - getFeedData.feed.header.timestamp.low) / 60);
		return { noDelay: noDelay };
	} else {
		var yesDelay = Math.ceil(delay / 60);
		return { yesDelay: yesDelay };
	}
}

export default IsDelayMock;