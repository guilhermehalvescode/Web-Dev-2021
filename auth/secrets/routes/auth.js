const route = require("express").Router();
const AuthController = require("../controllers/authController");
const authController = new AuthController();

route.get("/", authController.home)

route.route("/login")
  .get(authController.getLogin)
  .post(authController.postLogin)

route.route("/register")
  .get(authController.getRegister)
  .post(authController.postRegister);

module.exports = route;
