import Koa from 'koa'

const app = new Koa()

app.use(async ctx => {
  ctx.body = "Hello Koa!"
})

const port = 8888
console.log("Started on port: " + port)
app.listen(port)