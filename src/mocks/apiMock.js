const axios = require('axios');

export function getFeedId (sub) {
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

export function getFeedData (sub) {
	if (getFeedId(sub) === 2) {
		return axios.get('http://localhost:4000').then((data) => JSON.parse(data));
	}
}

export function reverseStop (sub, stop) {
	const stops = require('../utils/stops');
	const stopN = stops.filter((subStop) => {
		return subStop.stop_name === stop && subStop.stop_id.charAt(0) === sub;
	}).find((subStop) => {
		return subStop.stop_id.charAt(subStop.stop_id.length - 1) === 'N';
	});
	return stopN.stop_id;
}

export function isDelay (sub, stop) {
	return getFeedData(sub).then((data) => {
		return data.entity.filter((entityObj) => {
			return entityObj.stop_time_update !== undefined;
		});
	}).then((newData) =>  {
		console.log(newData);
	}).catch((err) => {
		console.log(err);
	});
}





// export function isDelay (sub, stop) {
// 	let arrivals, delays = [];
// 	const feedObjs = getFeedData(sub).then((data) => {
// 		data.entity.filter((entityObj) => {
// 			return entityObj.trip_update.stop_time_update.stop_id === reverseStop(sub, stop)

// 			if (entityObj.trip_update !== null && entityObj.trip_update.stop_time_update.stop_id == reverseStopN(sub, stop)) {
// 				return entityObj.trip_update.stop_time_update;
// 			}
// 		});
// 	});
// 	for (var i = 0; i < feedObjs.length; i++) {
// 		if (feedObjs.arrival !== undefined) {
// 			arrivals.push(feedObjs.arrival.time.low);
// 			delays.push(feedObjs.arrival.delay);
// 		}
// 	}
// 	const nextArrival = Math.min(...arrivals);
// 	const delayIndex = arrivals.indexOf(nextArrival);
// 	const delay = delays.delayIndex;
// 	if (delay === null) {
// 		return getFeedData(sub).then((data) => {
// 			return (nextArrival - data.header.timestamp.low) / 60;
// 		});
// 	} else {
// 		return Math.ceil(delay / 60);
// 	}
// }