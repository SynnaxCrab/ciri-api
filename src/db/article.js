import uuidv4 from 'uuid/v4'
import { sql } from 'pg-sql'
import { INSERT, UPDATE, WHERE } from 'pg-sql-helpers'
import QUERY from './query'

const generateArticleSlug = (uuid, title) =>
  `${title
    .toLowerCase()
    .split(' ')
    .join('-')}-${uuid.split('-').pop()}`

const allArticlesSQL = () => sql`
  SELECT *
  FROM articles
  LIMIT 5
`

export const findAllArticles = async () => {
  const rows = await QUERY(allArticlesSQL())
  return rows
}

const articleByUuidSQL = uuid => sql`
  SELECT *
  FROM articles
  ${WHERE({ uuid })}
`

export const findArticleByUuid = async uuid => {
  const rows = await QUERY(articleByUuidSQL(uuid))
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

const updateArticleSQL = (uuid, { title, body }) => {
  return sql`
    ${UPDATE('articles', {
      title,
      body,
    })}
    ${WHERE({ uuid })}
    RETURNING *
  `
}

export const updateArticle = async (uuid, data) => {
  const rows = await QUERY(updateArticleSQL(uuid, data))
  return rows[0]
}

const deleteArticleSQL = uuid => sql`
  DELETE FROM articles
  ${WHERE({ uuid })}
`

export const deleteArticle = async uuid => await QUERY(deleteArticleSQL(uuid))
