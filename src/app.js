import Koa from 'koa'
import cors from 'kcors'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'

import schema from './data/schema'

const app = new Koa()
const router = new koaRouter()
const PORT = 3000

app.use(cors())
app.use(koaBody())

router.post('/graphql', graphqlKoa({ schema: schema }))
router.get('/graphql', graphqlKoa({ schema: schema }))

router.get('/graphiql', graphiqlKoa({
  endpointURL: '/graphql'
}))

app.use(router.routes())
app.use(router.allowedMethods())

console.log("Started on port: " + PORT)
app.listen(PORT)
