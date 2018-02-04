import { makeExecutableSchema } from "graphql-tools"

import {
  typeDefs as articleTypeDefs,
  resolvers as articleResolvers,
} from "./data/article"

import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from "./data/scalars"

const RootQuery = `
  type Query {
    articles: [Article]
    article(id: ID!): Article
  }
`

const RootMutation = `
  type Mutation {
    addArticle(input: AddArticleInput!): AddArticlePayload
    updateArticle(input: UpdateArticleInput!): UpdateArticlePayload
    deleteArticle(input: DeleteArticleInput!): DeleteArticlePayload
  }
`

const SchemaDefinition = `
  schema {
    query: Query,
    mutation: Mutation,
  }
`

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    RootMutation,
    articleTypeDefs,
    scalarTypeDefs,
  ],
  resolvers: articleResolvers,
})
