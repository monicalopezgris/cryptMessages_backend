/* eslint-disable */

const assert = require('assert');
const crypt = require('../helpers/crypt');
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const url = 'http://localhost:5000';

describe('Test login ', () => {
  const userCredentials = { username: 'admin', password: 'admin' }
  it('should return a json user', (done) => {
    chai
      .request(url)
      .post('/api/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        console.log('console.log=>', res, 'endOfConsolelog')
        expect(res).to.have.status(200);
      });
    done();
  });
});

// describe('Encryptation tests', () => {
//   describe('encrypt function', () => {
//     const jump = 2;
//     it('should not return undefined', () => {
//       const testArray = ['h', 'o', 'l', 'a'];
//       assert.notEqual(undefined, crypt.encrypt(testArray, jump))
//     })
//     it('should return a d on a 2 jump encryptation on b', () => {
//       const testArray = ['h', 'o', 'l', 'a'];
//       assert.equal('jqnc', crypt.encrypt(testArray, jump))
//     })
//   })
// })

// describe('Decryptation tests', () => {
//   describe('decrypt function', () => {
//     const jump = 2;
//     it('should not return undefined', () => {
//       const testArray = ['d', 'q', 'j'];
//       assert.notEqual(undefined, crypt.decrypt(testArray, jump))
//     })
//     it("should decrypt 'd' as 'b' on a 2 jump decryptation", () => {
//       const testArray = ['d'];
//       assert.equal('b', crypt.decrypt(testArray, jump))
//     })
//   })
// })

