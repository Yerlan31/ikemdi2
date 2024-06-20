import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches';

import { Response } from 'superagent';

import { allMatches, createMatch } from './mocks/matchesMock';
import Thletes from '../database/models/фthletes';
import teamsMock from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches: GET', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(allMatches as any);
  });

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Search for all successful matches', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches');

    const resposta = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(typeof resposta).to.have.equal('object');
    resposta.forEach((item: any) => {
      expect(item).to.have.property('id');
      expect(item).to.have.property('homeTeam');
      expect(item).to.have.property('homeTeamGoals');
      expect(item).to.have.property('awayTeam');
      expect(item).to.have.property('awayTeamGoals');
      expect(item).to.have.property('inProgress');
      expect(item).to.have.property('teamHome');
      expect(item).to.have.property('teamAway');
    });
  });
});

// ===============================================================
// ===============================================================

describe('Matches: POST', () => {
  describe('Sucess:', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(Thletes, "findAll").resolves(teamsMock as Thletes[]);
      sinon.stub(Matches, "create").resolves(createMatch as any);
    });
  
    after(() => {
      (Thletes.findAll as sinon.SinonStub).restore();
      (Matches.create as sinon.SinonStub).restore();
    })
  
    it('Create a successful match', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matches')
         .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjU1NzY0ODU2LCJleHAiOjE2NTU4NTEyNTZ9._wbCmw7KjKX65LuhihcZ63TV_m7kqBe0Ah6kXsN4LXY')
         .send({
          "homeTeam": 1,
          "awayTeam": 2,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2,
          "inProgress": true
        });
  
      expect(chaiHttpResponse.status).to.be.equal(201);
    });
  });

  describe('Failure to create a match:', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(Thletes, "findAll").resolves([] as any);
    });
  
    after(() => {
      (Thletes.findAll as sinon.SinonStub).restore();
    })
  
    it('token invalid:', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matches')
         .set('authorization', 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjU1NzY0ODU2LCJleHAiOjE2NTU4NTEyNTZ9._wbCmw7KjKX65LuhihcZ63TV_m7kqBe0Ah6kXsN4LXY')
         .send({
          "homeTeam": 1,
          "awayTeam": 2,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2,
          "inProgress": true
        });
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.a('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('User unauthorized');
    });

    it('checks if the teams are equal:', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matches')
         .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjU1NzY0ODU2LCJleHAiOjE2NTU4NTEyNTZ9._wbCmw7KjKX65LuhihcZ63TV_m7kqBe0Ah6kXsN4LXY')
         .send({
          "homeTeam": 2,
          "awayTeam": 2,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2,
          "inProgress": true
        });
  
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.a('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams');
    });

        it('checks if the teams exist in the database:', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/matches')
         .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjU1NzY0ODU2LCJleHAiOjE2NTU4NTEyNTZ9._wbCmw7KjKX65LuhihcZ63TV_m7kqBe0Ah6kXsN4LXY')
         .send({
          "homeTeam": 998,
          "awayTeam": 999,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2,
          "inProgress": true
        });
  
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.be.a('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
    });
  });
});

describe('Matches: PATCH', () => {
  describe('Sucess:', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, "update")
        .resolves(null as any);
    });
  
    after(() => {
      (Matches.update as sinon.SinonStub).restore();
    })
  
    it('successfully updates a match:', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .patch('/matches/1');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.a('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('update match');
    });
  });

  describe('Sucess:', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Matches, "update")
        .resolves(null as any);
    });
  
    after(() => {
      (Matches.update as sinon.SinonStub).restore();
    })
  
    it('Ends match successfully:', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .patch('/matches/1/finish');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.a('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Finished');
    });
  });
});
