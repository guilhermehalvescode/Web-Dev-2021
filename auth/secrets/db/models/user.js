const Mongoose = require("../connection");
const passportLocalMongoose = require("passport-local-mongoose");
module.exports = class User extends Mongoose {
  constructor() {
    super();
    this.schema = new this.db.Schema({
      email: {
        type: String,
        minLength: 7,
        maxLength: 50,
        required: [true, "User must have an email."]
      }
    });
    //https://www.npmjs.com/package/passport-local-mongoose
    this.schema.plugin(passportLocalMongoose, { usernameField: 'email' });
    this.Model = this.db.model("User", this.schema);
  }

  index = async () => 
    this.mongooseQuery(async () => {
      return await this.Model.find({});
    })

  create = async ({ email, password }) => 
    this.mongooseQuery(async () => {
      return await this.Model.register({ email }, password);
    });
  

  find = async filter => 
    this.mongooseQuery(async () => {
      return await this.Model.findOne(filter);
    });
  
    
}