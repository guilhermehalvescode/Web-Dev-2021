//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const Item = require("./db/models/item");
const itemCollection = new Item();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
  const items = await itemCollection.index();
  return res.render("list", { listTitle: "Today", newListItems: items });
});

app.post("/", async (req, res) => {
  const { newItem: name } = req.body;
  await itemCollection.insert({ name });
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const { checkbox: id } = req.body;
  await itemCollection.deleteById(id);
  res.redirect("/");
});

app.get("/:collection", function (req, res) {
  const { collection } = req.params;
  res.render("list", { listTitle: collection, newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
