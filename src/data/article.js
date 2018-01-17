import * as Article from "../models/article"

export const typeDefs = `
  type Article {
    id: ID!
    title: String!
    body: String
  }

  input AddArticleInput {
    title: String
    body: String
  }

  input UpdateArticleInput {
    id: ID!
    title: String
    body: String
  }

  input DeleteArticleInput {
    id: ID!
  }

  type 
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
    addArticle: async (_, { input }) => {
      const res = await Article.create(input)
      return res.rows[0]
    },
    updateArticle: async (_, { input }) => {
      const res = await Article.update(input.id, input)
      return res.rows[0]
    },
    deleteArticle: async (_, { input }) => await Article.destroy(input.id),
  },
  Article: {
    title: ({ title }) => title.toUpperCase(),
  },
}
