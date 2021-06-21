//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const List = require("./db/models/itemDAO");
const listCollection = new List();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
  const items = await listCollection.index();
  return res.render("list", { listTitle: "Today", newListItems: items });
});

app.post("/", async (req, res) => {
  const { newItem: name, list: listName } = req.body;
  const isToday = listName === "Today";
  if (isToday)
    await listCollection.insert({ name });
  else {
    await listCollection.listInsert(name, listName);
  }
  res.redirect(isToday ? "/" : `/${listName}`);
});

app.post("/delete", async (req, res) => {
  const { checkbox: id } = req.body;
  await listCollection.deleteById(id);
  res.redirect("/");
});

app.get("/:collection", async (req, res) => {
  const { collection } = req.params;
  let list = await listCollection.listFindOne(collection);
  if (!list) {
    await listCollection.listCreate(collection);
  }
  res.render("list", { listTitle: collection, newListItems: list?.items || [] });
});

app.post("/:collection", async (req, res) => {
  const { collection } = req.params;
  let list = await listCollection.listFindOne(collection);
  if (!list) {
    await listCollection.listCreate(collection);
  }
  res.render("list", { listTitle: collection, newListItems: list?.items || [] });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
