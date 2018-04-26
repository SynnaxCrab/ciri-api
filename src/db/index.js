import Debug from 'debug'
import { Pool } from 'pg'
import { sql } from 'pg-sql'
import { INSERT, UPDATE, WHERE } from 'pg-sql-helpers'
import uuidv4 from 'uuid/v4'

const debug = Debug('db')
const pool = new Pool()

const userByUuidSQL = uuid => sql`
  SELECT *
  FROM users 
  ${WHERE({ uuid })}
`

export const findUserByUuid = async uuid => {
  try {
    const { rows } = await pool.query(userByUuidSQL(uuid))
    return rows[0]
  } catch (e) {
    debug(e)
    throw e
  }
}

export const query = async sql => {
  try {
    const res = await pool.query(sql)
    return res
  } catch (err) {
    console.log(err.stack)
  }
}
