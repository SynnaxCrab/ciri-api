import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'

const schema = `
type Article {
  id: ID!
  title: String
  body: String
}

type Query {
  articles: [Article]
}
`
export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
})
