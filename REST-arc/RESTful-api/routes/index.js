const route = require("express").Router();

const articleRoute = require("./article");

//articles RESTful Route to handle req
route.use("/articles", articleRoute);

module.exports = route;