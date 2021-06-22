const route = require("express").Router();
const ArticleController = require("../controllers/articleController");
const articleController = new ArticleController();

route.route("/")
  //Get all articles
  .get(articleController.index)
  //Create an article
  .post(articleController.create)
  //Delete all articles
  .delete(articleController.deleteAll);

module.exports = route;