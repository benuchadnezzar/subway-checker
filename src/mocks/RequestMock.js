import GtfsRealtimeBindings from 'gtfs-realtime-bindings';
import axios from 'axios';

axios.get('./MockPBufData')
	.then(function (body) {
		var feedData = body.data;
		var feed = GtfsRealtimeBindings.FeedMessage.decode(feedData);
		return { feed: feed };
	});

export default RequestMock;