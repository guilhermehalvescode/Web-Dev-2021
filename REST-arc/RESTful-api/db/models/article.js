const Mongoose = require("../connection");

module.exports = class Article extends Mongoose {
  constructor() {
    super();
    this.schema = this.db.Schema({
      title: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: [true, "Article must have a title."]
      },
      content: {
        type: String,
        minLength: 1,
        maxLength: 300,
        required: [true, "Article must gave a content"]
      }
    });
    this.Model = this.db.model("articles", this.schema);
  }

  index = async () => 
    this.mongooseQuery(async () => {
      return await this.Model.find({});
    })

  create = async ({ title, content }) => 
    this.mongooseQuery(async () => {
      return await (new this.Model({ title, content })).save();
    });
  
  delete = async (filter) => {
    this.mongooseQuery(async () => {
      return await this.Model.deleteMany(filter);
    })
  }

  updatePut = async (filter, article) => {
    this.mongooseQuery(async () => {
      return await this.Model.update(filter, article, { overwrite: true })
    })
  }

  updatePatch = async (filter, article) => {
    this.mongooseQuery(async () => {
      return await this.Model.updateOne(filter, article)
    })
  }

  find = async filter => 
    this.mongooseQuery(async () => {
      return await this.Model.findOne(filter);
    });
  
}