const Express = require("express");
const BodyParser = require("body-parser");
const Axios = require("axios");


const API_KEY = "f708be98bbe8124b2f1249cc33f64015";

const port = 3000;
const app = Express();

app.set("view engine", "ejs");
app.use(Express.static("public"));
app.use(BodyParser.urlencoded({ extended: true }));

app.listen(port, () =>
{
	console.log("Example app listening on port 3000!")
});

app.get("/", (req, res) =>
{
	res.render("index", { weather: null, error: null });
});

app.post("/", async (req, res) =>
{
	try
	{
		const apiRes = await Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&units=metric&appid=${API_KEY}`);
		
		const data = apiRes.data;
		
		res.render("index", { weather: `It is ${data.main.temp} degrees in ${data.name}`, error: null });
	}
	catch(e)
	{
		res.render("index", { weather: null, error: "Erorr: please try again" });
	}
});