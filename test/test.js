//var assert = require('assert');
import { expect } from 'chai'

describe('Array', () => {
  describe('#indexOf()', () => {
    it('returns -1 when the value is not present', () => {
      expect(-1, [1,2,3].indexOf(4));
    });
  });
});
