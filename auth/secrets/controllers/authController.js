const User = require("../db/models/user");
module.exports = class AuthController {
  constructor() {
    this.userCollection = new User();
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
      if(user.password !== body.password) throw new Error("Passwords don't match");
      return res.render("secrets");
    } catch(e) {
      return res.render("login");
    }
  }

  getRegister = (req, res) => {
    res.render("register");
  }

  postRegister = async ({ body }, res) => {
    try {
      await this.userCollection.create(body);
      return res.render("secrets");
    } catch(e) {
      console.log(e);
      return res.render("register");
    }
  }
}
