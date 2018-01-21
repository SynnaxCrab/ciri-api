import { sql } from 'pg-sql'
import { INSERT, UPDATE, WHERE } from 'pg-sql-helpers'
import uuidv4 from 'uuid/v4'

import { query } from '../db'

const findSQL = (id) => sql`
  SELECT *
  FROM users 
  ${WHERE({ id: id })}
`
export const find = async (id) => await query(findSQL(id))
