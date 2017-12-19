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

    test('has field title', () => {
      expect(articleType.getFields()).toHaveProperty('title')
    })

    test('title field is not null', () => {
      expect(articleType.getFields().title.type.constructor).toBe(GraphQLNonNull)
    })

    test('title field type is GraphQLString', () => {
      expect(articleType.getFields().title.type.ofType).toBe(GraphQLString)
    })

    test('has field body', () => {
      expect(articleType.getFields()).toHaveProperty('body')
    })

    test('body field type is GraphQLString', () => {
      expect(articleType.getFields().body.type).toBe(GraphQLString)
    })
  })
})
