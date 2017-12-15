import GtfsRealtimeBindings from 'mta-gtfs-realtime-bindings';
import axios from 'axios';

function getFeedId (sub) {
	switch (sub) {
		case '1': case '2': case '3': case '4': case '5': case '6': case 'S':
			return 1;
		case 'A': case 'C': case 'E':
			return 26;
		case 'N': case 'Q': case 'R': case 'W':
			return 16;
		case 'B': case 'D': case 'F': case 'M':
			return 21;
		case 'L':
			return 2;
		case 'G':
			return 31;
	}
}

function getFeedData (sub) {
	return axios.get('https://cors-anywhere.herokuapp.com/http://datamine.mta.info/mta_esi.php?key=5db5e052519d17320f490738f2afe0d5&feed_id=' + getFeedId(sub))
		.then((data) => {
			return GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
		});
}

function reverseStopN (sub, stop) {
	const stops = require('../utils/stops');
	const stopObjs = stops.filter((item) => item.stop_name == stop && typeof item.stop_id === 'string' && item.stop_id.charAt(0) == sub);
	for (var i = 0; i < stopObjs.length; i++) {
		if (stopObjs[i].stop_id.charAt(stopObjs[i].stop_id.length - 1) == 'N') {
			return stopObjs[i].stop_id;
		}
	}
}

function reverseStopS (sub, stop) {
	const stops = require('../utils/stops');
	const stopObjs = stops.filter((item) => item.stop_name == stop && typeof item.stop_id === 'string' && item.stop_id.charAt(0) == sub);
	for (var i = 0; i < stopObjs.length; i++) {
		if (stopObjs[i].stop_id.charAt(stopObjs[i].stop_id.length - 1) == 'S') {
			return stopObjs[i].stop_id;
		}
	}
}

function isDelayN (sub, stop) {
	let arrivals, delays = [];
	const feedObjs = getFeedData(sub).then((data) => {
		data.entity.filter((entityObj) => {
			if (entityObj.trip_update !== null && entityObj.trip_update.stop_time_update.stop_id == reverseStopN(sub, stop)) {
				return entityObj.trip_update.stop_time_update;
			}
		});
	});
	for (var i = 0; i < feedObjs.length; i++) {
		if (feedObjs.arrival !== undefined) {
			arrivals.push(feedObjs.arrival.time.low);
			delays.push(feedObjs.arrival.delay);
		}
	}
	const nextArrival = Math.min(...arrivals);
	const delayIndex = arrivals.indexOf(nextArrival);
	const delay = delays.delayIndex;
	if (delay === null) {
		return getFeedData(sub).then((data) => {
			return (nextArrival - data.header.timestamp.low) / 60;
		});
	} else {
		return Math.ceil(delay / 60);
	}
}

function isDelayS (sub, stop) {
	let arrivals, delays = [];
	const feedObjs = getFeedData(sub).then((data) => {
		data.entity.filter((entityObj) => {
			if (entityObj.trip_update !== null && entityObj.trip_update.stop_time_update.stop_id == reverseStopS(sub, stop)) {
				return entityObj.trip_update.stop_time_update;
			}
		});
	});
	for (var i = 0; i < feedObjs.length; i++) {
		if (feedObjs.arrival !== undefined) {
			arrivals.push(feedObjs.arrival.time.low);
			delays.push(feedObjs.arrival.delay);
		}
	}
	const nextArrival = Math.min(...arrivals);
	const delayIndex = arrivals.indexOf(nextArrival);
	const delay = delays.delayIndex;
	if (delay === null) {
		return getFeedData(sub).then((data) => {
			return (nextArrival - data.header.timestamp.low) / 60;
		});
	} else {
		return Math.ceil(delay / 60);
	}
}

export { isDelayN, isDelayS };






















// const GetFeedData = (function () {
// 	let feedId;
// 	return {
// 		getFeedId: function (sub) {
// 			switch (sub) {
// 				case '1': case '2': case '3': case '4': case '5': case '6': case 'S':
// 					feedId = 1;
// 					break;
// 				case 'A': case 'C': case 'E':
// 					feedId = 26;
// 					break;
// 				case 'N': case 'Q': case 'R': case 'W':
// 					feedId = 16;
// 					break;
// 				case 'B': case 'D': case 'F': case 'M':
// 					feedId = 21;
// 					break;
// 				case 'L':
// 					feedId = 2;
// 					break;
// 				case 'G':
// 					feedId = 31;
// 					break;
// 			}
// 		},
// 		getFeedData: function () {
// 			return rp({
// 				method: 'GET',
// 				url: 'https://cors-anywhere.herokuapp.com/http://datamine.mta.info/mta_esi.php?key=5db5e052519d17320f490738f2afe0d5&feed_id=' + feedId,
// 				encoding: null
// 			}).then((buf) => {
// 				return GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buf);
// 			});
// 		}
// 	};
// })();

// const ReverseStop = (function () {
// 	let stopIdN, stopIdS;
// 	const stopData = require('./stops');
// 	return {
// 		reverseStop: function (sub, stop) {
// 			function filterByName (item) {
// 				if (item.stop_name == stop && typeof item.stop_id === 'string' && item.stop_id.charAt(0) == sub) {
// 					return true;
// 				}
// 				return false;
// 			}
// 			var stopObjs = stopData.filter(filterByName);
// 			for (var i = 0; i < stopObjs.length; i++) {
// 				if (stopObjs[i].stop_id.charAt(stopObjs[i].stop_id.length - 1) == 'N') {
// 					stopIdN = stopObjs[i].stop_id;
// 				} else if (stopObjs[i].stop_id.charAt(stopObjs[i].stop_id.length - 1) == 'S') {
// 					stopIdS = stopObjs[i].stop_id;
// 				}
// 			}
// 		},
// 		stopIdN: stopIdN,
// 		stopIdS: stopIdS
// 	};
// })();

// export const IsDelayN = (function () {
// 	let noDelay, yesDelay;
// 	return {
// 		isDelay: function (sub, stop) {
// 			GetFeedData.getFeedId(sub);
// 			ReverseStop.reverseStop(sub, stop);
// 			let arrivals = [];
// 			let delays = [];
// 			GetFeedData.getFeedData().then(function (entity) {
// 				(function dataFilter () {
// 					var feedObjs = GetFeedData.getFeedData().entity.filter(function (entityObj) {
// 						if (entityObj.trip_update !== null && entityObj.trip_update.stop_time_update.stop_id == ReverseStop.stopIdN) {
// 							return entityObj.trip_update.stop_time_update;
// 						}
// 					});
// 					for (var i = 0; i < feedObjs.length; i++) {
// 						if (feedObjs.arrival !== undefined) {
// 							arrivals.push(feedObjs.arrival.time.low);
// 							delays.push(feedObjs.arrival.delay);
// 						}
// 					}
// 				})();
// 			});
// 			var nextArrival = Math.min(...arrivals);
// 			var delayIndex = arrivals.indexOf(nextArrival);
// 			var delay = delays.delayIndex;
// 			if (delay === null || Math.ceil(delay / 60) <= 5) {
// 				noDelay = Math.ceil((nextArrival - GetFeedData.feed.header.timestamp.low) / 60);
// 			} else {
// 				yesDelay = Math.ceil(delay / 60);
// 			}
// 		},
// 		noDelay: noDelay,
// 		yesDelay: yesDelay,
// 	};
// })();

// export const IsDelayS = (function () {
// 	let noDelay, yesDelay;
// 	return {
// 		isDelay: function (sub, stop) {
// 			GetFeedData.getFeedId(sub);
// 			ReverseStop.reverseStop(sub, stop);
// 			var arrivals = [];
// 			var delays = [];
// 			GetFeedData.getFeedData().then(function (entity) {
// 				(function dataFilter () {
// 					var feedObjs = GetFeedData.getFeedData().entity.filter(function (entityObj) {
// 						if (entityObj.trip_update !== null && entityObj.trip_update.stop_time_update.stop_id == ReverseStop.stopIdS) {
// 							return entityObj.trip_update.stop_time_update;
// 						}
// 						return false;
// 					});
// 					for (var i = 0; i < feedObjs.length; i++) {
// 						if (feedObjs.arrival !== undefined) {
// 							arrivals.push(feedObjs.arrival.time.low);
// 							delays.push(feedObjs.arrival.delay);
// 						}
// 					}
// 				})();
// 			});
// 			var nextArrival = Math.min(...arrivals);
// 			var delayIndex = arrivals.indexOf(nextArrival);
// 			var delay = delays.delayIndex;
// 			if (delay === null || Math.ceil(delay / 60) <= 5) {
// 				noDelay = Math.ceil((nextArrival - GetFeedData.feed.header.timestamp.low) / 60);
// 			} else {
// 				yesDelay = Math.ceil(delay / 60);
// 			}
// 		},
// 		noDelay: noDelay,
// 		yesDelay: yesDelay,
// 	};
// })();