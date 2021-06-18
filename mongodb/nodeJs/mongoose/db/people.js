class PeopleCollection {
  constructor() {
    this.db = require("mongoose");
    this.peopleSchema = new this.db.Schema({
      name: String,
      age: Number
    });
    this.Person = new this.db.model("Person", this.peopleSchema);
  }

  async insertPerson(person = {}) {
    try {
      await this.connect();
      return (new this.Person(person)).save();
    } catch (e) {
      return null;
    }
  }

  async insertPeople(people = []) {
    try {
      await this.connect();
      this.Person.insertMany(people.map(person => this.Person(person)), err => {
        if(err) throw new Error("Error during insertion");
      });
    } catch (e) {
      return null;
    }
  }

  async deleteAll() {
    try {
      return await this.db
        .db("fruitsDb")
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

module.exports = PeopleCollection;