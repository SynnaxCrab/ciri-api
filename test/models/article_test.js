import { expect } from 'chai'
import rewire from 'rewire'
let Article = rewire('../../src/models/article')

describe('Article', () => {
  describe('#generateSlug', () => {
    let generateSlug = Article.__get__('generateSlug')
    let article = {
      id: '22a25978-bf28-4361-9677-c931125a2764',
      title: 'A Song of Ice and Fire'
    }
    it('generates slug correctly', () => {

      expect(generateSlug(article)).to.equal('a-song-of-ice-and-fire-c931125a2764')
    })
  })
})
