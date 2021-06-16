const { MongoClient } = require("mongodb");

// Replace the url string with your MongoDB deployment's connection string.
const url = "mongodb://localhost:27017";

class FruitsDb {
  constructor() {
    this.client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async insertManyFruits(fruitsArray = []) {
    try {
      await this.connect();
      return await this.client.db("fruitsDb")
          .collection("fruits")
          .insertMany(fruitsArray);
    } catch (e) {
      return null;
    }
  }

  async deleteAll() {
    try {
      await this.connect();
      return await this.client
        .db("fruitsDb")
        .collection("fruits")
        .deleteMany();
    } catch (e) {
      return null;
    }
  }

  async findFruit(query = {}) {
    try {
      await this.connect();
      return await this.client.db("fruitsDb")
          .collection("fruits")
          .find(query)
          .toArray();
    } catch (e) {
      return [];
    }
  }
  connect() {
    if(!this.client.isConnected())
      this.client.connect()
  }
  close() {
    this.client.close();
  }
}

module.exports = FruitsDb;