var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

var requestSettings = {
  method: 'GET',
  url: './MockPBufData',
  encoding: null
};

function RequestMock () {
	request(requestSettings, function (error, response, body) {
	  if (!error) {
	  var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
	  feed.entity.forEach(function(entity) {
	  	if (entity.trip_update) {
	  		console.log(entity.trip_update);
	    }
	   });
	  }
	});
}

RequestMock();