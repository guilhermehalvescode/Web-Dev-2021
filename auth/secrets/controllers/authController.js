const User = require("../db/models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
module.exports = class AuthController {

  startPassport() {
    this.passport.use(
      this.userCollection.Model.createStrategy()
    );
    this.passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    this.passport.deserializeUser(async (id, done) => {
      try {
        done(null, await this.userCollection.find({ _id: id }));
      } catch (e) {
        done(e, null);
      }
    });
    this.passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    }, (accessToken, refreshToken, profile, cb) =>
      this.userCollection.findOrCreate({ googleId: profile.id }, (err, user) => cb(err, user))
    ))

    this.passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/secrets"
    },
      (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        this.userCollection.findOrCreate({ facebookId: profile.id }, (err, user) => cb(err, user))
      }
    ));
  }

  constructor() {
    this.userCollection = new User();
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
          if (err) console.log(err);
          else this.passport.authenticate("local")(req, res, () => {
            res.redirect("/secrets");
          })
        })
      })
    } catch (e) {
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
      if (!user) throw new Error("Unable to register user");
      return next();
    } catch (e) {
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

  getSecrets = async (req, res) => {
    try {
      const secrets = await this.userCollection.find({ secret: { $exists: true } })
      res.render("secrets", {
        secrets: secrets.length ? secrets : [secrets]
      });
    } catch (e) {
      console.log(e);
      res.render("secrets", {
        secrets: []
      })
    }

  }

  getSubmit = (req, res) => {
    return req.isAuthenticated() ? res.render("submit") : res.redirect("/login");
  }

  postSubmit = async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect("/login");
    try {
      const { secret } = req.body;
      const { _id } = req.user;
      const user = await this.userCollection.find({ _id });
      user.secret = secret;
      await user.save();
      res.redirect("/secrets");
    } catch (e) {
      res.redirect("/submit");
    }
  }
}
