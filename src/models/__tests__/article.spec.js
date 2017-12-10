import Article from '../article'

describe('Article', () => {
  describe('#generateSlug', () => {
    test('generates slug correctly', () => {
      const generateSlug = Article.__get__('generateSlug')
      const id = '22a25978-bf28-4361-9677-c931125a2764'
      const title = 'A Song of Ice and Fire'
      expect(generateSlug(id, title)).toBe('a-song-of-ice-and-fire-c931125a2764')
    })
  })
})
