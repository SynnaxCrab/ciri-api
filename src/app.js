import { config } from "dotenv"
config()

import Koa from "koa"
import cors from "kcors"
import koaRouter from "koa-router"
import bodyParser from "koa-bodyparser"
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa"

import schema from "./schema"

const app = new Koa()
const router = new koaRouter()
const { PORT = 3000 } = process.env

router.post("/graphql", bodyParser(), graphqlKoa({ schema }))
router.get("/graphql", graphqlKoa({ schema }))
router.get("/graphiql", graphiqlKoa({ endpointURL: "/graphql" }))

app.use(cors({ credentials: true }))
app.use(router.routes())
app.use(router.allowedMethods())
app.use(bodyParser())

console.log(`App started on PORT: ${PORT}`)
app.listen(PORT)
