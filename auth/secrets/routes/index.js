const route = require("express").Router();

const authRoute = require("./auth");

route.use("/", authRoute);

module.exports = route;