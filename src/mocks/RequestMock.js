var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var fs = require('fs');

var RequestMock = new Promise(function (resolve, reject) {
	fs.readFile('./MockPBufData.txt', function (err, data) {
		if (err) {
			reject(err);
		}
		var feed = GtfsRealtimeBindings.FeedMessage.decode(data);
		resolve({ feed: feed });
	});
});

export default RequestMock;