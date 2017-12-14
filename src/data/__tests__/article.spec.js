import { GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql'
import { buildSchemaFromTypeDefinitions} from 'graphql-tools'
import { typeDefs } from '../article'

const schema = buildSchemaFromTypeDefinitions([
  typeDefs,
  'type Query { query: Query }',
])

const articleType = schema.getType('Article')

describe('Schema', () => {
  describe('Article Type', () => {
    test('has field id', () => {
      expect(articleType.getFields()).toHaveProperty('id')
    })

    test('id field is not null', () => {
      expect(articleType.getFields().id.type.constructor).toBe(GraphQLNonNull)
    })

    test('id field type is GraphQLID', () => {
      expect(articleType.getFields().id.type.ofType).toBe(GraphQLID)
    })
  })
})