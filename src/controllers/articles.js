import ArticleSerializer from '../serializers/article'
import models from '../models';
const Article = models.Article;

export const index = function() {
  return async function(ctx, next) {
    ctx.body = ArticleSerializer.serialize(
      await Article.scope('recent').findAll()
    );
  }
};

export const show = function() {
  return async function(ctx, next) {
    ctx.body = ArticleSerializer.serialize(
      await Article.findOne({
        where: { slug: ctx.params.slug }
      })
    )

    if (!ctx.body) ctx.status = 404;
  }
};

export const create = function() {
  return async function(ctx, next) {
    const data = ctx.request.body;
    ctx.body = ArticleSerializer.serialize(await Article.create(data));
    ctx.status = 201;
  }
};

export const update = function() {
  return async function(ctx, next) {
    const data = ctx.request.body;
    const article = await Article.findOne({
      where: { slug: ctx.params.slug }
    });
    ctx.body = ArticleSerializer.serialize(
      await article.updateAttributes(data, {
        fields: ['title', 'body', 'slug']
      })
    )
  }
}
