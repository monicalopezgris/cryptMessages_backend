/* eslint-disable */

const assert = require('assert');
const crypt = require('../helpers/crypt');

describe('Encryptation tests', () => {
  describe('encrypt function', () => {
    const jump = 2;
    it('should not return undefined', () => {
      const testArray = ['b'];
      assert.notEqual(undefined, crypt.encrypt(testArray, jump))
    })
    it('should return a d on a 2 jump encryptation on b', () => {
      const testArray = ['b'];
      assert.equal('d', crypt.encrypt(testArray, jump))
    })
  })
})

describe('Decryptation tests', () => {
  describe('decrypt function', () => {
    const jump = 2;
    it('should not return undefined', () => {
      const testArray = ['d', 'q', 'j'];
      assert.notEqual(undefined, crypt.decrypt(testArray, jump))
    })
    it("should decrypt 'd' as 'b' on a 2 jump decryptation", () => {
      const testArray = ['d'];
      assert.equal('b', crypt.decrypt(testArray, jump))
    })
  })
})
