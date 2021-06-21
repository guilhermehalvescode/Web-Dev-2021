const route = require("express").Router();
const List = require("../db/models/itemDAO");
const listCollection = new List();
const _ = require("lodash");

route.get("/", async (req, res) => {
  const items = await listCollection.index();
  return res.render("list", { listTitle: "Today", newListItems: items });
});

route.post("/", async (req, res) => {
  const { newItem: name, list: listName } = req.body;
  const isToday = listName === "Today";
  if (isToday)
    await listCollection.insert({ name });
  else 
    await listCollection.listInsert(name, listName);
  
  res.redirect(isToday ? "/" : `/${listName}`);
});

route.post("/delete", async (req, res) => {
  const { checkbox: id, list } = req.body;
  const isToday = list === "Today";
  if (isToday)
    await listCollection.deleteById(id);
  else 
    await listCollection.listDeleteById(id, list);
  res.redirect(isToday ? "/" : `/${list}`);
});

route.get("/:collection", async (req, res) => {
  const collection = _.capitalize(req.params.collection);
  let list = await listCollection.listFindOne(collection);
  if (!list) {
    await listCollection.listCreate(collection);
  }
  res.render("list", { listTitle: collection, newListItems: list?.items || [] });
});

route.get("/about", function (req, res) {
  res.render("about");
});


module.exports = route;