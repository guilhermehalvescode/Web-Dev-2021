const Mongoose = require("../connection");

module.exports = class Item extends Mongoose {
  constructor() {
    super();
    this.schema = new this.db.Schema({
      name: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: [true, "Item needs to have a name"]
      }
    });
    this.Model = this.db.model("Item", this.schema);
  }

  index = async () => 
    this.mongooseQuery(async () => {
      try {
        return await this.Model.find({});
      } catch(e) {
        return e;
      }
    });
  insert = async item => 
    this.mongooseQuery(async () => {
      try {
        return await (new this.Model(item)).save();
      } catch(e) {
        return e;
      }
    });
    
  deleteById = async id => 
    this.mongooseQuery(async () => {
      try {
        return await this.Model.deleteOne({ _id: id});
      } catch(e) {
        return e;
      }
    })
}