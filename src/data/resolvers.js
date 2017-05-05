import models from '../models'

const Article = models.Article

const resolveFunctions = {
  Query: {
    articles: async() => {
      return await Article.scope('recent').findAll()
    }
  }
}

export default resolveFunctions
