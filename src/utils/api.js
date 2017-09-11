var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
var fs = require('fs');
 
var requestSettings = {
  method: 'GET',
  url: 'http://datamine.mta.info/mta_esi.php?key=5db5e052519d17320f490738f2afe0d5&feed_id=2',
  encoding: null
};

request(requestSettings, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
		stringFeed = JSON.stringify(feed, null, 2);
		fs.writeFile('./LTrains.json', stringFeed, 'utf8', function (err) {
			if (err) {
				return console.log(err);
			}
			console.log('Success!');
		});
	}
});

// request(requestSettings, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
//     feed.entity.forEach(function(entity) {
//       if (entity.trip_update) {
//         console.log(entity.trip_update);
//       }
//     });
//   }
// });


// request(requestSettings, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
//     feed.entity.forEach(function(entity) {
//       if (entity.vehicle) {
//         console.log(entity.vehicle);
//       }
//     });
//   }
// });