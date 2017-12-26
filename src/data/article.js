import * as Article from '../models/article'

export const typeDefs = `
  type Article {
    id: ID!
    title: String!
    body: String
  }

  input ArticleInput {
    title: String
    body: String
  }
`

export const resolvers = {
  Query: {
    articles: async () => {
      const res = await Article.findAll()
      return res.rows
    },
    article: async (_, { id }) => {
      const res = await Article.find(id)
      return res.rows[0]
    },
  },
  Mutation: {
    createArticle: async (_, data) => {
      const res = await Article.create(data)
      return res.rows[0]
    },
    updateArticle: async (_, data) => {
      const res = await Article.update(data.id, data)
      return res.rows[0]
    },
    destroyArticle: async (_, { id }) => await Article.destroy(id)
  },
}
