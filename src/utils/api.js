import GtfsRealtimeBindings from 'mta-gtfs-realtime-bindings';
import rp from 'request-promise';

function getFeedData (sub) {
	var feedId;
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
	rp({
		method: 'GET',
		url: 'https://cors-anywhere.herokuapp.com/http://datamine.mta.info/mta_esi.php?key=5db5e052519d17320f490738f2afe0d5&feed_id=' + getFeedData.feedId,
		encoding: null
	}).then((buf) => {
		const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buf);
		return { feed: feed };
	});
}

function reverseStop (sub, stop) {
	var stopIdN;
	var stopIdS;
	var stopData = require('./stops');
	var invalidEntries = 0;
	function filterByName (item) {
		if (item.stop_name == stop && typeof item.stop_id === 'string' && item.stop_id.charAt(0) == sub) {
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

export function isDelayN (sub, stop) {
	var arrivals = [];
	var delays = [];
	reverseStop(sub, stop);
	getFeedData(sub);
	function dataFilter () {
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
	}
	var nextArrival = Math.min(...arrivals);
	var delayIndex = arrivals.indexOf(nextArrival);
	var delay = delays.delayIndex;
	if (delay === null || Math.ceil(delay / 60) <= 5) {
		var noDelay = Math.ceil((nextArrival - getFeedData.feed.header.timestamp.low) / 60);
		return { noDelay: noDelay };
	} else {
		var yesDelay = Math.ceil(delay / 60);
		return { yesDelay: yesDelay };
	}
}

export function isDelayS (sub, stop) {
	var arrivals = [];
	var delays = [];
	reverseStop(sub, stop);
	getFeedData(sub);
	function dataFilter () {
		var invalidEntries = 0;
		var feedObjs = getFeedData.feed.filter(function (feedObj) {
			if (feedObj.entity.trip_update.stop_time_update.stop_id == reverseStop.stopIdS) {
				return feedObj.entity.trip_update.stop_time_update;
			}
		});
		for (var i = 0; i < feedObjs; i++) {
			arrivals.push(feedObjs.arrival.time.low);
			delays.push(feedObjs.arrival.delay);
		}
	}
	var nextArrival = Math.min(...arrivals);
	var delayIndex = arrivals.indexOf(nextArrival);
	var delay = delays.delayIndex;
	if (delay === null || Math.ceil(delay / 60) <= 5) {
		var noDelay = Math.ceil((nextArrival - getFeedData.feed.header.timestamp.low) / 60);
		return { noDelay: noDelay };
	} else {
		var yesDelay = Math.ceil(delay / 60);
		return { yesDelay: yesDelay };
	}
}