module.exports = class Mongoose {
  constructor() {
    this.db = require("mongoose");
  }
  mongooseQuery = async callback => {
    try {
      await this.db.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
      });
      const res = await callback();
      this.db.connection.close();
      return res;
    } catch(e) {
      console.error(e);
      return e;
    }
  }
}