import { config } from "dotenv"
config()

import Koa from "koa"
import cors from "kcors"
import koaRouter from "koa-router"
import bodyParser from "koa-bodyparser"
import session from "koa-session"
import passport from "koa-passport"
import twitterStrategy from "passport-twitter"
import { graphqlKoa, graphiqlKoa } from "apollo-server-koa"

import schema from "./schema"

const app = new Koa()
const router = new koaRouter()
const { PORT = 3000 } = process.env

router.post("/graphql", koaBody(), graphqlKoa({ schema }))
router.get("/graphql", graphqlKoa({ schema }))
router.get("/graphiql", graphiqlKoa({ endpointURL: "/graphql" }))

passport.use(
  new twitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/twitter/callback",
    },
    function(token, tokenSecret, profile, cb) {
      User.findOrCreate({ twitterId: profile.id }, function(err, user) {
        return cb(err, user)
      })
    },
  ),
)

app.use(router.routes())
app.use(router.allowedMethods())
app.use(cors())
app.use(bodyParser())
app.keys = ["secret"]
app.use(session({}, app))
app.use(passport.initialize())
app.use(passport.session())

app.listen(PORT)
