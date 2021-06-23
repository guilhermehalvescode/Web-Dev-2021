const Article = require("../db/models/article");

module.exports = class ArticleController {
  constructor() {
    this.articleCollection = new Article();
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

  index = async (req, res) => {
    try {
      return res.status(200).json(
        await this.articleCollection.index()
      );
    } catch(e) {
      return res.status(400).json(e);
    }
  }

  find = async ({ params }, res) => {
    try {
      return res.status(200).json(
        await this.articleCollection.find({ 
          title: params.name 
        })
      )
    } catch(e) {
      return res.status(400).json(e);
    }
  }

  updatePut = async ({ params, body }, res) => {
    try {
      return res.status(200).json(
        await this.articleCollection.updatePut({
          title: params.name
        }, body)
      )
    } catch(e) {
      return res.status(400).json(e);
    }
  }

  updatePatch = async ({ params, body }, res) => {
    try {
      return res.status(200).json(
        await this.articleCollection.updatePatch({
          title: params.name
        }, body)
      )
    } catch(e) {
      return res.status(400).json(e);
    }
  }
  
  delete = async ({ params }, res) => {
    try {
      return res.status(200).json(
        await this.articleCollection.delete({ title: params.name})
      );
    } catch(e) {
      return res.status(400).json(e);
    }
  }
  
  deleteAll = async (req, res) => {
    try {
      return res.status(200).json(
        await this.articleCollection.delete({})
      );
    } catch(e) {
      return res.status(400).json(e);
    }
  }

}