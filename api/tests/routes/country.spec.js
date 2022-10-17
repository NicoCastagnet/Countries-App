/* eslint-disable import/no-extraneous-dependencies */
const session = require('supertest-session');
const app = require('../../src/app.js');
const { expect } = require('chai');
const { conn } = require('../../src/db.js');

const agent = session(app);

describe('Testing | Routing', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );

  describe('GET /countries', () => {
    it('Should return 200 if finds data.', () =>
      agent.get('/countries').expect(200));
    it('Recieved elements must be typeof Object', () => {
      return agent
        .get('/countries')
        .expect(200)
        .expect((res) => {
          expect(typeof res.body[0]).equal('object');
        });
    });
  });

  describe('GET /countries?name={data}', () => {
    it('Should respond 200 while receiving camel case data', () => {
      return agent.get('/countries?name=ArGENtinA').expect(200);
    });
    it('Should return an error if country does not exists.', () => {
      return agent.get('/countries?name=wrongName').expect(404);
    });
    it('Should return the country data.', () => {
      return agent
        .get('/countries?name=Argentina')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.name === 'Argentina');
        });
    });
  });

  describe('GET /countries/:id', () => {
    it('Should return the name of the country', () => {
      return agent
        .get('/countries/ARG')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.name).equal('Argentina');
        });
    });
    it('Should return 200 if any country is found', () => {
      return agent.get('/countries/ARG').expect(200);
    });
  });

  describe('GET /allactivities', () => {
    it('Should return a list of all the activities.', () => {
      return agent
        .get('/allactivities')
        .expect(200)
        .expect('Content-Type', /json/);
    });
  });
});
