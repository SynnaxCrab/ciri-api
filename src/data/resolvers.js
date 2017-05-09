import models from '../models'

const Article = models.Article

const resolveFunctions = {
  Query: {
    articles: async() => {
      return await Article.scope('recent').findAll()
    }
  },
  Mutation: {
    createArticle: async (_, data) => {
      return await Article.create(data)
    },
    destroyArticle: async (_, { id }) => {
      const article = await Article.findById(id)
      await article.destroy()
      return article
    }
  }
}

export default resolveFunctions
