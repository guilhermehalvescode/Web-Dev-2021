//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const todo = require("./routes/todo");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(todo);

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
