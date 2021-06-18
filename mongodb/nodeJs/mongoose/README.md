# Mongoose

## [Basics](https://mongoosejs.com/docs/index.html)

- Mongoose is a npm package built to simplify and shorten code when using MongoDb as a database.
- It's logic is little bit different when compared to drivers and other packages.
  > Our example will have a `peopleDb` database with a collection named `people`

## [Connection](https://mongoosejs.com/docs/connections.html)

- To connect to MongoDb using mongoose, firstly, you need to require mongoose and call `mongoose.connect(url, options)` to connect.

```javascript
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/" + "peopleDb"; //Already selects a db named 'peopleDb'
mongoose.connect(url, {
  useNewUrlParser: true, //default options for the latest package
  useUnifiedTopology: true, //default options for the latest package
});
```

- To close connection to MongoDb using mongoose, just call `mongoose.connection.close();`

## [Schemas](https://mongoosejs.com/docs/guide.html)

- Before doing CRUD over MongoDb, mongoose needs to have a schema(boilerplate) over a document.

```javascript
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/" + "peopleDb"; //Already selects a db named 'peopleDb'
mongoose.connect(url, {
  useNewUrlParser: true, //default options for the latest package
  useUnifiedTopology: true, //default options for the latest package
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
```

- A Schema can also have a [validation](https://mongoosejs.com/docs/validation.html)

```javascript
const personSchema = new mongoose.Schema({
  //name must be a string, and has a minimum length of '2' and maximum length of '100'
  //If name is null, show error with message: "A person needs a name"
  name: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: [true, "A person needs a name"],
  },
  //age must be a number, and has a minimum of '0' and maximum of '150'
  age: {
    type: Number,
    min: 0,
    max: 150,
  },
});
```

## [Model](https://mongoosejs.com/docs/models.html)

- After a schema is created, you need to create a model to finally start doing CRUD over MongoDb.

```javascript
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/" + "peopleDb"; //Already selects a db named 'peopleDb'
mongoose.connect(url, {
  useNewUrlParser: true, //default options for the latest package
  useUnifiedTopology: true, //default options for the latest package
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
//auto-creates a collection named plurally(lodash usage)
const Person = new mongoose.model("Person", peopleSchema);
```

## [CRUD Operations](https://mongoosejs.com/docs/queries.html)

- Once `Person` Model has been created, all CRUD operations can be done over `person` collection

### [**Create**](https://mongoosejs.com/docs/documents.html)

- Insert One

```javascript
//Creates john, 26 years-old
const john = new Person({
  name: "John",
  age: 26,
});
//And saves him to the people collection
john.save();
```

- Insert Many

```javascript
const people = [
  {
    name: "Jeniffer",
    age: 8,
  },
  {
    name: "Josh",
    age: 30,
  },
];
/* 
Map each person creating 'People array' through the 'Person' model
and insert them
*/
Person.insertMany(
  people.map((person) => new Person(person)),
  (err) => {
    //Callback to handle Errors
    if (err) console.log("Error during insertion");
  }
);
```

### **Read**

- [List all people](https://mongoosejs.com/docs/api.html#model_Model.find)

```javascript
Person.find((err, people) => {
  if (err) console.log(err);
  else {
    //Show all people names
    people.forEach((person) => console.log(person.name));
  }
});
```

- [Find one person](https://mongoosejs.com/docs/api.html#model_Model.findOne)

```javascript
Person.findOne({ name: "john" }, function (err, person) {
  if (err) console.log(err);
  else {
    //Shows john age, if he is in the people collection
    console.log(person.age);
  }
});
```

### **Update**

- [Update One](https://mongoosejs.com/docs/api.html#model_Model.updateOne)

```javascript
Person.updateOne(
  {
    name: "John", //Filter for name john
  },
  {
    age: 30, //Set it's age to 30
  },
  (err) => {
    //callback to handle error/success
    if (err) console.log(err);
    else console.log("John updated it's age");
  }
);
```

### **Delete**

- [Delete One](https://mongoosejs.com/docs/api.html#model_Model.deleteOne)

```javascript
Person.deleteOne(
  {
    _id: 2, //Delete the person with _id == 2
  },
  (err) => {
    //callback to handle error/success
    if (err) console.log(err);
    else console.log("John updated it's age");
  }
);
```

- [Delete Many](https://mongoosejs.com/docs/api.html#model_Model.deleteMany)

```javascript
Person.deleteMany(
  {
    name: "Test", //Delete all people named 'Test'
  },
  (err) => {
    //callback to handle error/success
    if (err) console.log(err);
    else console.log("All Test documents have been deleted");
  }
);
```

## [MongoDB Relationship in Mongoose](https://mongoosejs.com/docs/subdocs.html)

- To establish relationships between collections, just make a schema nested in a schema
```javascript
const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});
```
