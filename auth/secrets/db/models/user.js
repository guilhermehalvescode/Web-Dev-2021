const Mongoose = require("../connection");

module.exports = class User extends Mongoose {
  constructor() {
    super();
    this.schema = this.db.Schema({
      email: {
        type: String,
        minLength: 7,
        maxLength: 50,
        required: [true, "User must have an email."]
      },
      password: {
        type: String,
        minLength: 7,
        maxLength: 30,
        required: [true, "User must gave a password"]
      }
    });
    this.Model = this.db.model("User", this.schema);
  }

  index = async () => 
    this.mongooseQuery(async () => {
      return await this.Model.find({});
    })

  create = async ({ email, password }) => 
    this.mongooseQuery(async () => {
      return await (new this.Model({ email, password })).save();
    });
  

  find = async filter => 
    this.mongooseQuery(async () => {
      return await this.Model.findOne(filter);
    });
  
}