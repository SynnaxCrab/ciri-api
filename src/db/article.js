import { sql } from 'pg-sql'
import { WHERE } from 'pg-sql-helpers'
import QUERY from './query'

const generateArticleSlug = (id, title) =>
  `${title
    .toLowerCase()
    .split(' ')
    .join('-')}-${id.split('-').pop()}`

const allArticlesSQL = () => sql`
  SELECT *
  FROM articles
  LIMIT 5
`

export const findAllArticles = async () => {
  const rows = await QUERY(findAllSQL())
  return rows[0]
}

const articleByIdSQL = id => sql`
  SELECT *
  FROM articles
  ${WHERE({ id: id })}
`

export const findArticleById = async id => {
  const rows = await QUERY(articleByIdSQL(id))
  return rows[0]
}

const createArticleSQL = ({ title, body }) => {
  const uuid = uuidv4()
  return sql`
    ${INSERT('articles', {
      uuid,
      title,
      body,
      slug: generateArticleSlug(uuid, title),
    })}
    RETURNING *
  `
}

export const createArticle = async data => {
  const rows = await QUERY(createArticleSQL(data))
  return rows[0]
}

const updateArticleSQL = (id, { title, body }) => {
  return sql`
    ${UPDATE('articles', {
      title,
      body,
    })}
    ${WHERE({ id: id })}
    RETURNING *
  `
}

export const update = async (id, data) => {
  const rows = await QUERY(updateArticleSQL(id, data))
  return rows[0]
}

const deleteArticleSQL = id => sql`
  DELETE FROM articles
  ${WHERE({ id: id })}
`

export const deleteArticle = async id => {
  const rows = await QUERY(deleteArticleSQL(id))
  return rows[0]
}
