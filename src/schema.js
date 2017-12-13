import { makeExecutableSchema } from 'graphql-tools'

import {
  typeDefs as Article,
  resolvers as articleResolvers
} from './data/article'

const RootQuery = `
  type Query {
    articles: [Article]
  }
`

const SchemaDefinition = `
  schema {
    query: Query
  }
`

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Article],
  articleResolvers,
})
