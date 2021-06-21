const Mongoose = require("../connection");

module.exports = class Post extends Mongoose {
  constructor() {
    super();
    this.schema = this.db.Schema({
      title: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: [true, "Post must have a title."]
      },
      body: {
        type: String,
        minLength: 1,
        maxLength: 300,
        required: [true, "Post must gave a body"]
      }
    });
    this.Model = this.db.model("post", this.schema);
  }

  index = async () => 
    this.mongooseQuery(async () => {
      return await this.Model.find({});
    })

  create = async ({ title, body }) => 
    this.mongooseQuery(async () => {
      return await (new this.Model({ title, body })).save();
    });
  

  findById = async id => 
    this.mongooseQuery(async () => {
      return await this.Model.findById(id);
    });
  
}