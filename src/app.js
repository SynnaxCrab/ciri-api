import { config } from 'dotenv'
config()

import Koa from 'koa'
import mount from 'koa-mount'
import cors from 'kcors'
import { ApolloServer, gql } from 'apollo-server-koa'

import auth from './auth'
import playgroundMiddleware from 'graphql-playground-middleware-koa'
import schema from './schema'

const server = new ApolloServer({
  schema,
  playground: false,
})

const app = new Koa()
const { PORT = 3000 } = process.env

app.keys = [process.env.SECRET]
app.use(cors({ credentials: true }))
app.use(
  mount(
    '/playground',
    playgroundMiddleware({
      endpoint: '/graphql',
      settings: {
        'editor.cursorShape': 'line',
      },
    }),
  ),
)

if (app.env !== 'development') {
  app.use(auth)
}

server.applyMiddleware({ app })

console.log(`🚀  API started on PORT: ${PORT}, at URI: ${server.graphqlPath}`)
app.listen(PORT)
