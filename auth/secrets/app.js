//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
require("dotenv").config();

const app = express();

const routes = require("./routes");

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is up at port " + (process.env.PORT || 3000))
})