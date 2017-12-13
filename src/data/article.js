import * as Article from '../models/article'

export const typeDefs = `
  type Article {
    id: ID!
    title: String
    body: String
  }
`
export const resolvers = {
  articles: async() => {
    const res = await Article.find()
    return res.rows
  }
}
