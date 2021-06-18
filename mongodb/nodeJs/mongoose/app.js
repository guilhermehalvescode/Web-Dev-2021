//jshint esversion:6

const peopleCollection = new (require("./db/people"))();

async function run() {
  try {
    const person = {
      name: "John",
      age: 26,
    };
    await peopleCollection.deleteAll();
    await peopleCollection.insertPerson(person);
    const p = await peopleCollection.findPerson({ name: "John" });
    console.log(p);
  } catch (e) {
    console.log(e);
  } finally {
    await peopleCollection.close();
  }
}
run().catch(console.dir);