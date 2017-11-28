import { config } from 'dotenv'
config()

import Koa from 'koa'
import cors from 'kcors'
import koaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

import schema from './data/schema'

const app = new Koa()
const router = new koaRouter()
const { PORT = 3000 } = process.env

app.use(cors())

router.post('/graphql', koaBody(), graphqlKoa({ schema }))
router.get('/graphql', graphqlKoa({ schema }))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(router.routes())
app.use(router.allowedMethods())

console.log("Started on port: " + PORT)
console.log(`PGHOST is: ${process.env.PGHOST}`)
console.log(`PGDATABASE is: ${process.env.PGDATABASE}`)
console.log(`PGUSER is: ${process.env.PGUSER}`)
app.listen(PORT)
