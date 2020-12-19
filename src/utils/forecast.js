const request = require("request");

const forecast = (longitude, latitude, callback) => {
	const url =
		"http://api.weatherstack.com/current?access_key=32b15603b49eb06105586598d300891a&query=" +
		latitude +
		"," +
		longitude +
		"&units=f";

	const isValidLongitude = isNaN(longitude);
	const isValidLatitude = isNaN(latitude);

	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback("Unable to connect to weather servise!", undefined);
		} else if (response.body.error || isValidLatitude || isValidLongitude) {
			callback("Unable to find location", undefined);
		} else {
			callback(
				undefined,
				`${response.body.current.weather_descriptions[0]}. It's currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`
			);
		}
	});
};

module.exports = forecast;
