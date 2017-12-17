import * as Article from '../models/article'

export const typeDefs = `
  type Article {
    id: ID!
    title: String
    body: String
  }
`

export const resolvers = {
  Query: {
    articles: async () => {
      const res = await Article.find()
      return res.rows
    }
  },
  Mutation: {
    createArticle: async (_, data) => {
      const res = await Article.create(data)
      return res.rows
    },
    destroyArticle: async (_, { id }) => await Article.destroy(id)
  },
}
