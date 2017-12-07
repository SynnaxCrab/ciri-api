import { sql } from 'pg-sql'
import { INSERT, WHERE } from 'pg-sql-helpers'
import uuidv4 from 'uuid/v4'

import { query } from '../db'

const generateSlug = (id, title) => `${title.toLowerCase().split(' ').join('-')}-${id.split('-').pop()}`

const findSQL = () => sql`
  SELECT *
  FROM articles
  LIMIT 5
`

export const find = async () => await query(findSQL())

const createSQL = ({ title, body }) => {
  const id = uuidv4()
  return sql`
    ${INSERT('articles', { 
      id: id,
      title: title,
      body: body,
      slug: generateSlug(id, title),
    })}
    RETURNING *
  `
}

export const create = async (data) => query(createSQL(data))

const destroySQL = (id) => sql`
  DELETE FROM articles
  ${WHERE({ id: id })}
`

export const destroy = async (id) => query(destroySQL(id))
