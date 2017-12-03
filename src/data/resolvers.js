import { sql } from 'pg-sql'
import { INSERT, WHERE } from 'pg-sql-helpers'
import { pool } from '../db'
import uuidv4 from 'uuid/v4'

const resolveFunctions = {
  Query: {
    articles: async() => {
      try {
        const res = await pool.query(sql`
          SELECT *
          FROM articles
          LIMIT 5
        `)
        return res.rows
      } catch(err) {
        console.log(err.stack)
      }
    }
  },
  Mutation: {
    createArticle: async (_, data) => {
      const { title } = data
      const id = uuidv4()
      const slug = title.toLowerCase().split(' ').join('-')
      const now = new Date()
      try {
        const res = await pool.query(sql`
          ${INSERT('articles', { ...data, id: id, slug: slug, createdAt: now, updatedAt: now })}
          RETURNING *
        `)
      } catch(err) {
        console.log(err.stack)
      }
    },
    destroyArticle: async (_, { id }) => {
      await pool.query(sql`
        DELETE FROM articles
        ${WHERE({ id: id })}
      `)
    }
  }
}

export default resolveFunctions
