import { Serializer } from 'jsonapi-serializer'

export default new Serializer("articles", {
  attributes: ['title', 'body', 'slug', 'createdAt', 'updatedAt']
})
