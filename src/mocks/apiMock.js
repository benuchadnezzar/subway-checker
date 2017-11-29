const GetFeedData = (function () {
	let feed, feedId;
	return {
		getFeedId: function (sub) {
			switch (sub) {
				case '1': case '2': case '3': case '4': case '5': case '6': case 'S':
					feedId = 1;
					break;
				case 'A': case 'C': case 'E':
					feedId = 26;
					break;
				case 'N': case 'Q': case 'R': case 'W':
					feedId = 16;
					break;
				case 'B': case 'D': case 'F': case 'M':
					feedId = 21;
					break;
				case 'L':
					feedId = 2;
					break;
				case 'G':
					feedId = 31;
					break;
			}
		},
		getFeedData: function () {
			if (feedId === 2) {
				feed = require('./MockData');
			}
		},
		feed: feed
	};
})();

const ReverseStop = (function () {
	let stopIdN, stopIdS;
	const stopData = require('../utils/stops');
	return {
		reverseStop: function (sub, stop) {
			var invalidEntries = 0;
			function filterByName (item) {
				if (item.stop_name == stop && typeof item.stop_id === 'string' && item.stop_id.charAt(0) == sub) {
					return true;
				}
				invalidEntries ++;
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
		},
		stopIdN: stopIdN,
		stopIdS: stopIdS
	};
})();

export const IsDelayN = (function () {
	let noDelay, yesDelay, nextArrival, delay;
	return {
		isDelay: function (sub, stop) {
			GetFeedData.getFeedId(sub);
			GetFeedData.getFeedData();
			ReverseStop.reverseStop(sub, stop);
			var arrivals = [];
			var delays = [];
			function dataFilter () {
				var invalidEntries = 0;
				var feedObjs = GetFeedData.feed.filter(function (feedObj) {
					if (feedObj.entity.trip_update.stop_time_update.stop_id == ReverseStop.stopIdN) {
						return feedObj.entity.trip_update.stop_time_update;
					}
				});
				for (var i = 0; i < feedObjs.length; i++) {
					arrivals.push(feedObjs.arrival.time.low);
					delays.push(feedObjs.arrival.delay);
				}
			}
			nextArrival = Math.min(...arrivals);
			var delayIndex = arrivals.indexOf(nextArrival);
			delay = delays.delayIndex;
			if (delay === null || Math.ceil(delay / 60) <= 5) {
				noDelay = Math.ceil((nextArrival - GetFeedData.feed.header.timestamp.low) / 60);
			} else {
				yesDelay = Math.ceil(delay / 60);
			}
		},
		noDelay: noDelay,
		yesDelay: yesDelay,
		nextArrival: nextArrival 
	};
})();

export const IsDelayS = (function () {
	let noDelay, yesDelay, nextArrival, delay;
	return {
		isDelay: function (sub, stop) {
			GetFeedData.getFeedId(sub);
			GetFeedData.getFeedData();
			ReverseStop.reverseStop(sub, stop);
			var arrivals = [];
			var delays = [];
			function dataFilter () {
				var invalidEntries = 0;
				var feedObjs = GetFeedData.feed.filter(function (feedObj) {
					if (feedObj.entity.trip_update.stop_time_update.stop_id == ReverseStop.stopIdS) {
						return feedObj.entity.trip_update.stop_time_update;
					}
				});
				for (var i = 0; i < feedObjs; i++) {
					arrivals.push(feedObjs.arrival.time.low);
					delays.push(feedObjs.arrival.delay);
				}
			}
			nextArrival = Math.min(...arrivals);
			var delayIndex = arrivals.indexOf(nextArrival);
			delay = delays.delayIndex;
			if (delay === null || Math.ceil(delay / 60) <= 5) {
				noDelay = Math.ceil((nextArrival - GetFeedData.feed.header.timestamp.low) / 60);
			} else {
				yesDelay = Math.ceil(delay / 60);
			}
		},
		noDelay: noDelay,
		yesDelay: yesDelay,
		nextArrival: nextArrival
	};
})();