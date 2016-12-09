import Koa from 'koa'
import mount from 'koa-mount'
import router from './routes/index'

const app = new Koa()
app.use(router.routes()).use(router.allowedMethods())

app.use(async ctx => {
  ctx.body = "Hello Koa API!"
})

const port = 8888
console.log("Started on port: " + port)
app.listen(port)
