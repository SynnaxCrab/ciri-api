function generateSlug(article) {
  return article.title.toLowerCase().split(' ').join('-')
  + '-'
  + article.id.split('-').pop();
}

export default function(sequelize, DataTypes) {
  var Article = sequelize.define('Article', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    slug: DataTypes.STRING
  }, {
    scopes: {
      recent: {
        order: [['createdAt', 'DESC']],
        limit: 5
      }
    },

    hooks: {
      beforeValidate: function(article, options, fn) {
        article.slug = generateSlug(article);
        fn(null, article);
      }
    }
  });

  return Article;
};
