import { config } from "dotenv"
config()

import Koa from "koa"
import cors from "kcors"
import koaRouter from "koa-router"
import bodyParser from "koa-bodyparser"
import session from "koa-session"
import passport from "koa-passport"
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa"

import schema from "./schema"

const app = new Koa()
const router = new koaRouter()
const { PORT = 3000 } = process.env

router.post("/graphql", koaBody(), graphqlKoa({ schema }))
router.get("/graphql", graphqlKoa({ schema }))
router.get("/graphiql", graphiqlKoa({ endpointURL: "/graphql" }))

app.use(router.routes())
app.use(router.allowedMethods())
app.use(cors())
app.use(bodyParser())
app.keys = ["secret"]
app.use(session({}, app))
app.use(passport.initialize())
app.use(passport.session())

app.listen(PORT)
