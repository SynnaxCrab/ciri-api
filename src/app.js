import Koa from 'koa'
import mount from 'koa-mount'
import router from './routes/index'

const app = new Koa()
const api = new Koa()
api.use(router.routes()).use(router.allowedMethods())

app.use(mount('/api', api))
app.use(async ctx => {
  ctx.body = "Hello Koa!"
})

const port = 8888
console.log("Started on port: " + port)
app.listen(port)
