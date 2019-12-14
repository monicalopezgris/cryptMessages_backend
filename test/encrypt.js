/* eslint-disable */

const assert = require('assert');
const crypt = require('../helpers/crypt');
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const url = 'http://localhost:5000/api';

describe('Test #auth ', () => {
  const userCredentials = { username: 'admin', password: 'admin' }

  it('should return a json user', (done) => {
    chai
      .request(url)
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    done();
  });

});
