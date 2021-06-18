class PeopleCollection {
  constructor() {
    this.db = require("mongoose");
    this.peopleSchema = new this.db.Schema({
      name: {
        type: String,
        minLength: 2,
        maxLength: 100
      },
      age: {
        type: Number,
        min: 0,
        max: 150
      }
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
      this.Person.insertMany(people.map(person => new this.Person(person)), err => {
        if(err) throw new Error("Error during insertion");
      });
    } catch (e) {
      return null;
    }
  }

  async deleteAll() {
    try {
      await this.connect();
      return await this.Person.deleteMany();
    } catch (e) {
      return null;
    }
  }

  async findPerson(query = {}) {
    try {
      await this.connect();
      return await this.Person.find(query);
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

  async close() {
    await this.db.connection.close();
  }
}

module.exports = PeopleCollection;