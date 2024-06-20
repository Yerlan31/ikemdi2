import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: 'admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$12$mzkBKxRA5xynlhGgQMbO7ukG9B/SBu0Q5tNJbpnhqSsUQWc7UVFBS',
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Login com sucesso:', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjU1NTg5ODk4LCJleHAiOjE2NTU2NzYyOTh9.CQwwTVk-jeM02_20rjJZUTWOoW4GrMlxKpc-6B9Da5Y')
       .send({
        "email": "admin@admin.com",
        "password":  "123456"
      })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.not.have.property('password');
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body.user).to.have.property('email');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('id');
  });

  it('Email inválido:', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjU1NTg5ODk4LCJleHAiOjE2NTU2NzYyOTh9.CQwwTVk-jeM02_20rjJZUTWOoW4GrMlxKpc-6B9Da5Y')
       .send({
         "email": "adminadmin.com",
         "password":  "123456"
        });
        
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.a('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.have.equal('Incorrect email or password');
  });

  it('Password inválido:', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjU1NTg5ODk4LCJleHAiOjE2NTU2NzYyOTh9.CQwwTVk-jeM02_20rjJZUTWOoW4GrMlxKpc-6B9Da5Y')
       .send({
        "email": "admina@dmin.com",
        "password":  "123"
      });

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.a('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.have.equal('Incorrect email or password');
  });
});
