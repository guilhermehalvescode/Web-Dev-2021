class FruitsCollection {
  constructor() {
    this.db = require("mongoose");
    this.fruitSchema = new this.db.Schema({
      name: String,
      rating: Number,
      review: String
    });
    this.Fruit = new this.db.model("Fruit", this.fruitSchema);
  }

  async insertFruit(fruit = {}) {
    try {
      await this.connect();
      return (new this.Fruit(fruit)).save();
    } catch (e) {
      return null;
    }
  }

  async deleteAll() {
    try {
      return await this.db
        .db("FruitsCollection")
        .collection("fruits")
        .deleteMany();
    } catch (e) {
      return null;
    }
  }

  async findFruit(query = {}) {
    try {
    } catch (e) {
      return [];
    }
  }
  async connect() {
    await this.db.connect("mongodb://localhost:27017/fruitsDb", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}

module.exports = FruitsCollection;