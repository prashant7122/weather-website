const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handelbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Prashant Kumar",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Prashant Kumar",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		name: "Prashant Kumar",
		helpText: "This is some useful text.",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "Provide an address to get weather",
		});
	}
	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}
			forecast(longitude, latitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}
				res.send({
					forecast: forecastData,
					location,
					address: req.query.address,
				});
			});
		}
	);
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Prashant Kumar",
		errorMessage: "Help article not found.",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Prashant Kumar",
		errorMessage: "Page Not Found.",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});