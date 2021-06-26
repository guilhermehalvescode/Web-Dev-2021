const User = require("../db/models/user");
module.exports = class AuthController {

  startPassport() {
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

  constructor() {
    this.userCollection = new User();
    //Passport configuration over Auth controller
    this.passport = require("passport");
  }

  home = (req, res) => {
    res.render("home");
  }

  getLogin = (req, res) => {
    res.render("login");
  }

  postLogin = async (req, res) => {
    try {
      this.userCollection.mongooseQuery(() => {
        req.login(new this.userCollection.Model({
          username: req.body.username,
          password: req.body.password
        }), err => {
          if(err) console.log(err);
          else res.redirect("/secrets");
        })
      })
    } catch(e) {
      console.log(e);
      return res.redirect("/login");
    }
  }

  logout = (req, res) => {
    req.logout();
    res.redirect("/");
  }

  getRegister = (req, res) => {
    res.render("register");
  }

  postRegister = async (req, res, next) => {
    try {
      const user = await this.userCollection.create(req.body);
      if(!user) throw new Error("Unable to register user");
      return next();
    } catch(e) {
      console.log(e);
      return res.redirect("/register");
    }
  }

  authenticate = async (req, res) => {
    try {
      this.userCollection.mongooseQuery(async () => {
        await this.passport.authenticate('local', (err, user, info) => {
          if (err || !user) return res.redirect("/register");
          req.logIn(user, err => {
            if (err) return res.redirect("/register");
            return res.redirect('/secrets');
          });
        })(req, res)
      })
    } catch (e) {
      console.log(e);
      return res.redirect("/register");
    }
  }

  getSecrets = (req, res) => {
    return req.isAuthenticated() ? res.render("secrets") : res.redirect("/login");
  }
}
