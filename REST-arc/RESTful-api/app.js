//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const api = require("./routes");
require("dotenv").config();

app.set('view engine', 'ejs');

app.use(bodyParser.json({
  extended: true
}));

app.use(express.static("public"));

//Set RESTful API at /api route
app.use("/api", api);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});