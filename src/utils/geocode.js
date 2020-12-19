const request = require("request");

const geocode = (address, callback) => {
	const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoicHJhc2hhbnQ3MTIyIiwiYSI6ImNraXQ4MmVuMjBtYzcydHBkbTNsaXU4NHgifQ.7WQ1vctjjdl2ve2NZ_2pxA&limit=1`;
	request({ url: geoCodeURL, json: true }, (error, {body}) => {
		if (error) {
			callback("Unbale to connect to loation services!");
		} else if (body.features.length === 0) {
			callback(
				`Unable to find location. Try another search.`
			);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
