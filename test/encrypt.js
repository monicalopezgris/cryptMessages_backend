/* eslint-disable */

const assert = require('assert');
const crypt = require('../helpers/crypt');

describe('Encryptation tests', () => {
  describe('isAlfa function', () => {
    const testTrue = 'b';
    const testFalse = '*';
    it('should not return undefined', () => {
      assert.notEqual(undefined, crypt.isAlpha(testTrue, /^[a-z]+$/))
    })
    it('should return true if input is a letter', () => {
      assert.equal(true, crypt.isAlpha(testTrue, /^[a-z]+$/))
    })
    it('should return false if input is not a letter', () => {
      assert.equal(false, crypt.isAlpha(testFalse, /^[a-z]+$/))
    })
  })
})