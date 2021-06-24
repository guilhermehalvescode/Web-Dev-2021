const User = require("../db/models/user");

const { compare } = require("../utils/hash");
module.exports = class AuthController {
  constructor() {
    this.userCollection = new User();
    //Passport configuration over Auth controller
    this.passport = require("passport");
    this.passport.init = this.passport.initialize();
    this.passport.sess = this.passport.session();
    this.passport.use(
      this.userCollection.Model.createStrategy()
    );
    this.passport.serializeUser(
      this.userCollection.Model.serializeUser()
    );
    this.passport.deserializeUser(
      this.userCollection.Model.deserializeUser()
    );
  }

  home = (req, res) => {
    res.render("home");
  }

  getLogin = (req, res) => {
    res.render("login");
  }

  postLogin = async ({ body }, res) => {
    try {
      const user = await this.userCollection.find({ email: body.email });
      if(!user) throw new Error("Email not registered");
      if(!(await compare(body.password, user.password))) 
        throw new Error("Passwords don't match");
      return res.render("secrets");
    } catch(e) {
      return res.render("login");
    }
  }

  getRegister = (req, res) => {
    res.render("register");
  }

  postRegister = async (req, res) => {
    try {
      const user = await this.userCollection.create(req.body);
      if(!user) throw new Error("Unable to register user");
      this.passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    } catch(e) {
      console.log(e);
      return res.redirect("register");
    }
  }

  getSecrets = (req, res) => {
    return req.isAuthenticated() ? res.render("secrets") : res.redirect("/login");
  }

}
