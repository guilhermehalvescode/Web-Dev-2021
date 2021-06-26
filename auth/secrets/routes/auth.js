const route = require("express").Router();
const AuthController = require("../controllers/authController");
const authController = new AuthController();

route.use(authController.passport.initialize());
route.use(authController.passport.session());
authController.startPassport();

route.get("/", authController.home);

route.get("/auth/google", authController.passport.authenticate("google", { scope: ["profile"] }));
route.get(
  "/auth/google/secrets",
  authController.passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/secrets"
  })
);

route.get('/auth/facebook',
  authController.passport.authenticate('facebook'));

route.get('/auth/facebook/secrets',
  authController.passport.authenticate('facebook', { 
    failureRedirect: '/login', 
    successRedirect: "/secrets" 
  }));

route.route("/login")
  .get(authController.getLogin)
  .post(authController.postLogin);

route.route("/register")
  .get(authController.getRegister)
  .post(
    authController.postRegister,
    authController.authenticate
  );

route.get("/logout", authController.logout);

route.get("/secrets", authController.getSecrets);
route.route("/submit")
  .get(authController.getSubmit)
  .post(authController.postSubmit);
  

module.exports = route;
