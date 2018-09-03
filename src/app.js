import { config } from 'dotenv'
config()

import Koa from 'koa'
import cors from 'kcors'
import { ApolloServer, gql } from 'apollo-server-koa'

import auth from './auth'
import schema from './schema'

const server = new ApolloServer({
  schema,
})

const app = new Koa()
const { PORT = 3000 } = process.env

app.keys = [process.env.SECRET]
app.use(cors({ credentials: true }))
// FIXME: Fix auth with GraphQL Playground
// app.use(auth)
server.applyMiddleware({ app })

console.log(`🚀  API started on PORT: ${PORT}, at URI: ${server.graphqlPath}`)
app.listen(PORT)
