import { makeExecutableSchema } from 'graphql-tools'

import {
  typeDefs as Article,
  resolvers as articleResolvers
} from './data/article'

const RootQuery = `
  type Query {
    articles: [Article]
  }

  type Mutation {
    createArticle(title: String, body: String): Article
    destroyArticle(id: ID!): Article
  }
`

const SchemaDefinition = `
  schema {
    query: Query
  }
`

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Article],
  resolvers: articleResolvers,
})
