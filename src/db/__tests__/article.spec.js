import { generateArticleSlug } from '../article'

describe('Article', () => {
  describe('#generateArticleSlug', () => {
    test('generates slug correctly', () => {
      const id = '22a25978-bf28-4361-9677-c931125a2764'
      const title = 'A Song of Ice and Fire'
      expect(generateArticleSlug(id, title)).toBe(
        'a-song-of-ice-and-fire-c931125a2764',
      )
    })
  })
})
