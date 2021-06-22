const Article = require("../db/models/article");

module.exports = class ArticleController {
  constructor() {
    this.articleCollection = new Article();
  }

  index = async (req, res) => {
    try {
      return res.status(200).json(
        await this.articleCollection.index()
      );
    } catch(e) {
      return res.status(400).json(e);
    }
  }

  create = async ({ body }, res) => {
    try {
      return res.status(200).json(
        await this.articleCollection.create(body)
      );
    } catch(e) {
      return res.status(400).json(e);
    }
  }

  deleteAll = async ({ body }, res) => {
    try {
      return res.status(200).json(
        await this.articleCollection.delete({})
      );
    } catch(e) {
      return res.status(400).json(e);
    }
  }
}