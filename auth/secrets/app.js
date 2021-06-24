//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
// const ejs = require("ejs");
const session = require("express-session");
const app = express();
app.use(session({
  secret: "a secret",
  resave: false,
  saveUninitialized: false
}));


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

const routes = require("./routes");

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is up at port " + (process.env.PORT || 3000))
})