const route = require("express").Router();
const AuthController = require("../controllers/authController");
const authController = new AuthController();

route.get("/", authController.home)

route.use(authController.passport.initialize());
route.use(authController.passport.session());
authController.startPassport();

route.route("/login")
  .get(authController.getLogin)
  .post(authController.postLogin)

route.route("/register")
  .get(authController.getRegister)
  .post(
    authController.postRegister,
    authController.authenticate
  );

route.get("/logout", authController.logout)
  

route.route("/secrets")
  .get(authController.getSecrets);

module.exports = route;
