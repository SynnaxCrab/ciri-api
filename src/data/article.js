import * as Article from "../models/article"

export const typeDefs = `
  type Article {
    id: ID!
    title: String!
    body: JSON
    createdAt: DateTime
  }

  type ArticleFeed {
    cursor: String!
    articles: [Article]!
  }

  input AddArticleInput {
    title: String
    body: JSON
  }

  type AddArticlePayload {
    article: Article!
  }

  input UpdateArticleInput {
    id: ID!
    title: String
    body: JSON
  }

  type UpdateArticlePayload {
    article: Article!
  }

  input DeleteArticleInput {
    id: ID!
  }

  type DeleteArticlePayload {
    deletedArticleId: ID!
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
    addArticle: async (_, { input }) => {
      const res = await Article.create(input)
      return {
        article: res.rows[0],
      }
    },
    updateArticle: async (_, { input }) => {
      const res = await Article.update(input.id, input)
      return {
        article: res.rows[0],
      }
    },
    deleteArticle: async (_, { input }) => {
      const res = await Article.destroy(input.id)
      return {
        deletedArticleId: input.id,
      }
    },
  },
  Article: {
    title: ({ title }) => title.toUpperCase(),
  },
}
