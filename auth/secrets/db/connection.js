module.exports = class Mongoose {
  constructor() {
    this.db = require("mongoose");
  }
  mongooseQuery = async callback => {
    await this.db.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    return await callback();
  }
}