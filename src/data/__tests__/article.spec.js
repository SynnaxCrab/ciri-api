import { GraphQLID, GraphQLString, GraphQLNonNull } from "graphql"
import { buildSchemaFromTypeDefinitions } from "graphql-tools"
import { typeDefs } from "../article"

const schema = buildSchemaFromTypeDefinitions([
  typeDefs,
  "type Query { query: Query }",
])

const article = schema.getType("Article")

describe("Schema", () => {
  describe("Article Types", () => {
    test("has field id", () => {
      expect(article.getFields()).toHaveProperty("id")
    })

    test("id field is not null", () => {
      expect(article.getFields().id.type.constructor).toBe(GraphQLNonNull)
    })

    test("id field type is GraphQLID", () => {
      expect(article.getFields().id.type.ofType).toBe(GraphQLID)
    })

    test("has field title", () => {
      expect(article.getFields()).toHaveProperty("title")
    })

    test("title field is not null", () => {
      expect(article.getFields().title.type.constructor).toBe(GraphQLNonNull)
    })

    test("title field type is GraphQLString", () => {
      expect(article.getFields().title.type.ofType).toBe(GraphQLString)
    })

    test("has field body", () => {
      expect(article.getFields()).toHaveProperty("body")
    })

    test("body field type is GraphQLString", () => {
      expect(article.getFields().body.type).toBe(GraphQLString)
    })
  })
})
