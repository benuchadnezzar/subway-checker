function reverseStop () {
	return { stopId: 'L03N'};
}

function getFeedData () {
	var feed = require('./MockData');
	return {
		feed: feed
	};
}

function isDelay () {
	var arrivals = [];
	var delays = [];
	reverseStop();
	getFeedData()
		.then(function (feed) {
			var invalidEntries = 0;
			var feedObjs = feed.filter(function (feedObj) {
				if (feedObj.entity.trip_update.stop_time_update.stop_id == reverseStop.stopId) {
					return feedObj.entity.trip_update.stop_time_update;
				}
			});
			for (i = 0; i < feedObjs.length; i++) {
				arrivals.push(feedObjs.arrival.time.low);
				delays.push(feedObjs.arrival.delay);
			}
		});
	var nextArrival = Math.min(...arrivals);
	var delayIndex = arrivals.findIndexOf(nextArrival);
	var delay = delays.delayIndex;
	if (delay === null || Math.ceil(delay / 60) <= 5) {
		var noDelay = Math.ceil((nextArrival - feed.header.timestamp.low) / 60);
		return { isDelay: noDelay };
	} else {
		yesDelay = Math.ceil(delay / 60);
		return { isDelay: yesDelay };
	}
}

export default isDelay;