//jshint esversion:6

const peopleCollection = new (require("./db/people"))();

async function run() {
  try {
    const person = {
      name: "John",
      age: 26,
    };
    await peopleCollection.insertPerson(person);
  } catch (e) {
    console.log(e);
  }
}
run().catch(console.dir);