//jshint esversion:6

const db = new (require("./db/connect"))();

async function run() {
  try {
    const fruits = [
      {
        name: "Apple",
        delicious: true
      },
      {
        name: "Banana",
        delicious: true
      },
      {
        name: "Kiwi",
        delicious: true
      },
    ];
    await db.deleteAll();
    await db.insertManyFruits(fruits);
    const fruit = await db.findFruit({ delicious: true });
    console.log(fruit);
  } catch(e) {
    console.log(e);
  } finally {
    db.close();
  }
}
run().catch(console.dir);