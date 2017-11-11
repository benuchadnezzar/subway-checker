import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import request from 'request';

function getFeedData (sub) {
	var feedId;
	switch (sub) {
		case '1' || '2' || '3' || '4' || '5' || '6' || 'S':
				feedId = 1;
				break;
			case 'A' || 'C' || 'E':
				feedId = 26;
				break;
			case 'N' || 'Q' || 'R' || 'W':
				feedId = 16;
				break;
			case 'B' || 'D' || 'F' || 'M':
				feedId = 21;
				break;
			case 'L':
				feedId = 2;
				break;
			case 'G':
				feedId = 31;
				break;
	}
	var requestSettings = {
	  method: 'GET',
	  uri: 'http://datamine.mta.info/mta_esi.php?key=YOUR_KEY_HERE&feed_id=2',
	  encoding: null
	};
	request(requestSettings, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		  var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
		  return { feed: feed };
		}
	});
}

function reverseStop (sub, stop) {
	var stopIdN
	var stopIdS
	var stopData = require('./stops');
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
}

var isDelayN = (function (sub, stop) {
	var arrivals = [];
	var delays = [];
	reverseStop(sub, stop);
	getFeedData(sub);
	(function () {
			var invalidEntries = 0;
			var feedObjs = getFeedData.feed.filter(function (feedObj) {
				if (feedObj.entity.trip_update.stop_time_update.stop_id == reverseStop.stopIdN) {
					return feedObj.entity.trip_update.stop_time_update;
				}
			});
			for (var i = 0; i < feedObjs.length; i++) {
				arrivals.push(feedObjs.arrival.time.low);
				delays.push(feedObjs.arrival.delay);
			}
		})();
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
})();

var isDelayS = (function (sub, stop) {
	var arrivals = [];
	var delays = [];
	reverseStop(stop);
	getFeedData(sub)
		.then(function (feed) {
			var invalidEntries = 0;
			var feedObjs = feed.filter(function (feedObj) {
				if (feedObj.entity.trip_update.stop_time_update.stop_id == reverseStop.stopIdS) {
					return feedObj.entity.trip_update.stop_time_update;
				}
			});
			for (var i = 0; i < feedObjs; i++) {
				arrivals.push(feedObjs.arrival.time.low);
				delays.push(feedObjs.arrival.delay);
			}
		});
	var nextArrival = Math.min(...arrivals);
	var delayInex = arrivals.findIndexOf(nextArrival);
	var delay = delays.delayIndex;
	if (delay === null || Math.ceil(delay / 60) <= 5) {
		var noDelay = Math.ceil((nextArrival - getFeedData.feed.header.timestamp.low) / 60);
		return { noDelay: noDelay };
	} else {
		var yesDelay = Math.ceil(delay / 60);
		return { yesDelay: yesDelay };
	}
})();

export { isDelayN, isDelayS };