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
  const wrongUserCredentials = { username: 'admin', password: 'aaas' }
  const nonExistUser = { username: 'nonExist', password: 'aaas' }

  it('should return 200 on LOGIN', (done) => {
    chai
      .request(url)
      .post('/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    done();
  });
  it('should return 401 on existing user but bad password on LOGIN', (done) => {
    chai
      .request(url)
      .post('/auth/login')
      .send(wrongUserCredentials)
      .end((err, res) => {
        expect(res).to.have.status(401);
      });
    done();
  });
  it('should return 404 on non existing user on LOGIN', (done) => {
    chai
      .request(url)
      .post('/auth/login')
      .send(nonExistUser)
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
    done();
  });

  it('should return 200 on LOGOUT', (done) => {
    chai
      .request(url)
      .post('/auth/logout')
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    done();
  });

});
