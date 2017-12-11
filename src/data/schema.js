import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'

const typeDefs = `
type Article {
  id: ID!
  title: String
  body: String
}

type Query {
  articles: [Article]
}

type Mutation {
  createArticle(title: String, body: String): Article
  destroyArticle(id: ID!): Article
}
`
export default makeExecutableSchema({
  typeDefs,
  resolvers,
})
