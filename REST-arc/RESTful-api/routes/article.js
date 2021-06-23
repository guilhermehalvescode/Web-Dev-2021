const route = require("express").Router();
const ArticleController = require("../controllers/articleController");
const articleController = new ArticleController();

//All article routes
route.route("/")
  //Get all articles
  .get(articleController.index)
  //Create an article
  .post(articleController.create)
  //Delete all articles
  .delete(articleController.deleteAll);

//Specific article routes
route.route("/:name")
  //Find one article by it's name
  .get(articleController.find)
  //Put a article by it's name
  .put(articleController.updatePut)
  //Patch a article by it's name
  .patch(articleController.updatePatch)
  //Delete a article by it's name
  .delete(articleController.delete)
module.exports = route;