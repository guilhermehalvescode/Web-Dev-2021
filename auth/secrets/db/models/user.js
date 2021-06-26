const Mongoose = require("../connection");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
module.exports = class User extends Mongoose {
  constructor() {
    super();
    this.schema = new this.db.Schema({
      username: String,
      password: String,
      googleId: String,
      facebookId: String,
      secret: String
    });
    //https://www.npmjs.com/package/passport-local-mongoose
    this.schema.plugin(passportLocalMongoose);
    this.schema.plugin(findOrCreate);
    this.Model = this.db.model("User", this.schema);
  }

  index = async () =>
    this.mongooseQuery(async () => {
      return await this.Model.find({});
    })

  create = async ({ username, password }) =>
    this.mongooseQuery(async () => {
      return await this.Model.register({ username }, password);
    });


  find = async filter =>
    this.mongooseQuery(async () => {
      return await this.Model.find(filter);
    });

  findOrCreate = async (filter, cb) =>
    this.mongooseQuery(async () => {
      return await this.Model.findOrCreate(filter, cb);
    });
}