# MongoDB

## [Basics](https://docs.mongodb.com/manual/introduction/)
* `db` is the object that holds the database inside mongodb
* `collections` in mongo holds the same concept of tables in SQL databases
  > tables: user, products, etc...
* `documents` in mongo holds the same concept of rows in SQL databases
* MongoDB queries usually have two varies, `One` and `Many`
* It's data(document) passed on queries are similar to JSON, simplifying operations when using a server based in JavaScript
* All data(document) have an `_id` field

## [CRUD Operations](https://docs.mongodb.com/manual/crud/)
>Using collections `products` as an example
### [**Create**](https://docs.mongodb.com/manual/crud/#create-operations)
- Insert One
  ```javascript
  db.products.insertOne( 
    {
      _id: 1,
      name: "Pencil",
      price: 0.80,
      stock: 12
    }
  ) 
  ```
- Insert Many
  ```javascript
  db.products.insertMany([
    {
      _id: 1,
      name: "Pencil",
      price: 0.80,
      stock: 12
    },
    {
      _id: 2,
      name: "Rubber",
      price: 1.80,
      stock: 52
    }
  ]) 
  ```

### [**Read**](https://docs.mongodb.com/manual/crud/#read-operations)
* List all products ```db.products.find()```
* List specific products using a filter
  ```javascript
  db.products.find({
    _id: 2,          // Search all products with _id == 2
    active: true     // and which are active
  })
  ```
* Select which fields are going to be selected
  ```javascript
  db.products.find({
    _id: 2,          // Search all products with _id == 2
    active: true     // and which are active
  }, {
    name: 1,         // Select for me the name,
    _id: 0           // but don't select for me the _id
  })
  ```

### [**Update**](https://docs.mongodb.com/manual/crud/#update-operations)
- Update One
  ```javascript
  db.products.updateOne( 
    { _id: 1 },          //Update the product with _id == 1
    { 
      $set: { 
        name: "Gloves",  //Set it's name to "Gloves"
        price: 70.5      //and it's price to 70.5
      } 
    }
  ) 
  ```
- Update Many
  ```javascript
  db.products.updateMany([
    { active: true },    //Update all the active products
    { 
      $set: { 
        name: "Gloves",  //Set their name to "Gloves"
        price: 70.5      //and their price to 70.5
      } 
    }
  ]) 
  ```

### [**Delete**](https://docs.mongodb.com/manual/crud/#delete-operations)
- Delete One
  ```javascript
  db.products.deleteOne( 
    { _id: 2 }          //Delete the product with _id == 2
  ) 
  ```
- Delete Many
  ```javascript
  db.products.deleteMany([
    { active: false }    //Delete all the unactive products
  ]) 
  ```
## [MongoDB Relationship](https://docs.mongodb.com/manual/core/data-modeling-introduction/#flexible-schema)
#### Relationships in MongoDB are made by: 
- nesting documents inside documents
- or usign foreign keys to associate documents
```javascript
db.products.insertOne(
  {
    _id: 1,
    name: "Pencil",
    price: 0.80,
    stock: 12,
    reviews: [ //Relationship is made by using an Array as a field in a document
      {
        authorName: "Guilherme",
        rating: 2,
        review: "Pretty bad"
      },
      {
        authorName: "Fernando",
        rating: 5,
        review: "Pretty good"
      }
    ],
    storeId: 4, //or by using a foreign key
  }
)
```
> _Each implementation has it's pros and cons_