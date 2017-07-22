import Koa from 'koa'
import cors from 'kcors'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'
import OpticsAgent from 'optics-agent'

import schema from './data/schema'
OpticsAgent.instrumentSchema(schema)

const app = new Koa()
const router = new koaRouter()
const PORT = 3000

app.use(cors())
app.use(koaBody())
app.use(OpticsAgent.koaMiddleware())

router.post(
  '/graphql',
  graphqlKoa(async ctx => {
    // create an optic context
    const opticsContext = OpticsAgent.context(ctx.request);
    // create a context for each request
    const context = { opticsContext };
    return {
      schema: schema,
      context,
    };
  })
);

router.get('/graphql', graphqlKoa({ schema: schema }))

router.get('/graphiql', graphiqlKoa({
  endpointURL: '/graphql'
}))

app.use(router.routes())
app.use(router.allowedMethods())

console.log("Started on port: " + PORT)
app.listen(PORT)
