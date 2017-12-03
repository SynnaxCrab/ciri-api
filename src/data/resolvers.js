import * as Article from '../models/article'

const resolveFunctions = {
  Query: {
    articles: async() => {
      const res = await Article.find()
      return res.rows
    }
  },
  Mutation: {
    createArticle: async (_, data) => {
      const res = await Article.insert(data)
      return res.rows
    },
    destroyArticle: async (_, { id }) => await Article.destroy(id)
  }
}

export default resolveFunctions
