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
server.applyMiddleware({ app })
const { PORT = 3000 } = process.env

app.keys = [process.env.SECRET]
app.use(cors({ credentials: true }))
//app.use(auth)

console.log(`App started on PORT: ${PORT}`)
app.listen(PORT)
