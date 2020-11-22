const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const apiKey = require(__dirname + '/keys.js');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const unit = "metric";
    console.log(apiKey);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            try {
                if(weatherData.cod != 200) throw weatherData;
                const temp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const url = `http://openweathermap.org/img/wn/${icon}@2x.png`
                res.write(`<h1>Weather in ${query}</h1>`)
                res.write(`<p>The weather description is ${weatherDescription}.</p>`);
                res.write("<h3>The temperature is " + temp + " degress Celsius.</h3>");
                res.write(`<img src="${url}" style="width:50px;">`)
                return res.send();
            } catch(e) {
                res.send(`<h1>Error: ${e.cod}</h1><h2>Couldn't get weather at ${query}, ${e.message}</h2>`);
            }
        });
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});