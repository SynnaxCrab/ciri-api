import router from 'koa-router'
import * as articles from '../controllers/articles'

export default router()
  .get('/articles', articles.index())
  .get('/articles/:slug', articles.show())
  .post('/articles', articles.create())
  .put('/articles/:slug', articles.update())
