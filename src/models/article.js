import { sql } from "pg-sql"
import { INSERT, UPDATE, WHERE } from "pg-sql-helpers"
import uuidv4 from "uuid/v4"

import { query } from "../db"

const generateSlug = (id, title) =>
  `${title
    .toLowerCase()
    .split(" ")
    .join("-")}-${id.split("-").pop()}`

const findAllSQL = () => sql`
  SELECT *
  FROM articles
  LIMIT 5
`

export const findAll = async () => await query(findAllSQL())

const findSQL = id => sql`
  SELECT *
  FROM articles
  ${WHERE({ id: id })}
`

export const find = async id => await query(findSQL(id))

const createSQL = ({ title, body }) => {
  const id = uuidv4()
  return sql`
    ${INSERT("articles", {
      id: id,
      title: title,
      body: body,
      slug: generateSlug(id, title),
    })}
    RETURNING *
  `
}

export const create = async data => query(createSQL(data))

const updateSQL = (id, { title, body }) => {
  return sql`
    ${UPDATE("articles", {
      title: title,
      body: body,
      slug: generateSlug(id, title),
    })}
    ${WHERE({ id: id })}
    RETURNING *
  `
}

export const update = async (id, data) => query(updateSQL(id, data))

const destroySQL = id => sql`
  DELETE FROM articles
  ${WHERE({ id: id })}
`

export const destroy = async id => query(destroySQL(id))
