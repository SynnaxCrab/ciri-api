import { expect } from 'chai'
import rewire from 'rewire'
const Article = rewire('../../src/models/article')

describe('Article', () => {
  describe('#generateSlug', () => {
    const generateSlug = Article.__get__('generateSlug')
    const id = '22a25978-bf28-4361-9677-c931125a2764'
    const title = 'A Song of Ice and Fire'
    it('generates slug correctly', () => {
      expect(generateSlug(id, title)).to.equal('a-song-of-ice-and-fire-c931125a2764')
    })
  })
})
