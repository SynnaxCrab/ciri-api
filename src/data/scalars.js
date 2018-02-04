import { GraphQLScalarType } from "graphql"
import GraphQLJSON from "graphql-type-json"
import { Kind } from "graphql/language"

export const typeDefs = `
  scalar DateTime
  scalar JSON
`

const resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }
      return null
    },
  }),
  JSON: GraphQLJSON,
}
