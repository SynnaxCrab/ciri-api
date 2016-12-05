import Koa from 'koa'
import mount from 'koa-mount'

const app = new Koa()
const api = new Koa()

api.use(async ctx => {
  ctx.body = "Hello Koa API!"
})

app.use(mount('/api', api))
app.use(async ctx => {
  ctx.body = "Hello Koa!"
})

const port = 8888
console.log("Started on port: " + port)
app.listen(port)
