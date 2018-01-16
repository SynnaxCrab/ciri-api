import * as Article from "../models/article"

export const typeDefs = `
  type Article {
    id: ID!
    title: String!
    body: String
  }

  input createArticleInput {
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
      console.log(res.rows[0])
      return res.rows[0]
    },
  },
  Mutation: {
    createArticle: async (_, { article }) => {
      const res = await Article.create(article)
      return res.rows[0]
    },
    updateArticle: async (_, { id, article }) => {
      const res = await Article.update(data.id, article)
      return res.rows[0]
    },
    destroyArticle: async (_, { id }) => await Article.destroy(id),
  },
  Article: {
    title: ({ title }) => title.toUpperCase(),
  },
}
