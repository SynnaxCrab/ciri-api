import {
  findAllArticles,
  findArticleByUuid,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../db/article'

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

  input CreateArticleInput {
    title: String
    body: JSON
  }

  type CreateArticlePayload {
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
      return await findAllArticles()
    },
    article: async (_, { id }) => {
      return await findArticleByUuid(id)
    },
  },
  Mutation: {
    createArticle: async (_, { input }) => ({
      article: await createArticle(input),
    }),
    updateArticle: async (_, { input }) => ({
      article: await updateArticle(input.id, input),
    }),
    deleteArticle: async (_, { input }) => {
      await deleteArticle(input.id)
      return {
        deletedArticleId: input.id,
      }
    },
  },
  Article: {
    id: ({ uuid }) => uuid,
    title: ({ title }) => title.toUpperCase(),
    createdAt: ({ created_at }) => created_at,
  },
}
