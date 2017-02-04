import faker from 'faker'
import { Factory } from 'rosie'

export default new Factory()
  .attrs({
    id: faker.random.uuid(),
    title: faker.name.title()
  })
