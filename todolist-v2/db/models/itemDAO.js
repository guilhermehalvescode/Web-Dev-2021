const Item = require("./item");

module.exports = class List extends Item {
  constructor() {
    super();
    this.listSchema = new this.db.Schema({
      name: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: [true, "List must have a name"]
      },
      items: [this.schema]
    });
    this.listModel = this.db.model("List", this.listSchema);
  }

  listFindOne = async (name = "") =>
    this.mongooseQuery(async () => {
      try {
        return await this.listModel.findOne({ name });
      } catch (e) {
        return e;
      }
    });

  listCreate = async lName =>
    this.mongooseQuery(async () => {
      try {
        return await (new this.listModel({ name: lName, items: [] })).save();
      } catch (e) {
        return e;
      }
    });

  insert = async item =>
    this.mongooseQuery(async () => {
      try {
        return await (new this.listModel(item)).save();
      } catch (e) {
        return e;
      }
    });
}