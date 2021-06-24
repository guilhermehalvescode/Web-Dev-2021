const User = require("../db/models/user");

const { compare } = require("../utils/hash");
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
      await this.userCollection.db.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      req.login(new this.userCollection.Model({
        email: req.body.email,
        password: req.body.password
      }), err => {
        if(err) console.log(err);
        else res.redirect("/secrets");
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
      return res.redirect("/register");
    }
  }

  authenticate = async (req, res) => {
    try {
      await this.userCollection.db.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      await this.passport.authenticate('local', async (err, user, info) => {
        if (err || !user) { return res.redirect("/register"); }
        await req.logIn(user, async err => {
          if (err) { return res.redirect("/register"); }
          return res.redirect('/secrets');
        });
      })(req, res)
    } catch (e) {
      console.log(e);
      return res.redirect("/register");
    }
  }

  getSecrets = (req, res) => {
    return req.isAuthenticated() ? res.render("secrets") : res.redirect("/login");
  }
}
