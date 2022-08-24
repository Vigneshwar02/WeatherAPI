require('dotenv').config()
const express = require("express");
const https = require("https");
const ejs = require("ejs");

const bodyParser = require("body-parser");
const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine","ejs");

app.get("/", function (req, res) {


    res.sendFile(__dirname + "/index.html");

});


app.post('/', function (req, res) {
    var cityName = req.body.cityName;
    var apikey = process.env.APIKEY
    console.log(cityName)
    console.log(apikey)
    const tempurl1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}` +"&units=metric"


    https.get(tempurl1, function (response) {
        response.on("data",(data)=>{
            const weatherData= JSON.parse(data)
            const temp = weatherData.main.temp
            console.log(temp)
              res.render("result", {
                 temp:temp,
                 cityName:cityName
              });
        })
        });
    })


app.listen(process.env.PORT, function () {
    console.log("server's running");
});