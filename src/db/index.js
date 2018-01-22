import { Pool } from "pg"

const pool = new Pool()

export const query = async sql => {
  try {
    return await pool.query(sql)
  } catch (err) {
    console.log(err.stack)
  }
}
