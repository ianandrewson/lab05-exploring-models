const app = require('../lib/app');
const request = require('supertest');

describe('server route tests', () => {
  it('has a home get route that says how rad the database is', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.body).toEqual({ text: 'Welcome to the most rad server to have ever served.' });
      });
  });
  it('has a post route that posts a Synth to the database', () => {
    return request(app)
      .post('/synths')
      .send({
        manufacturer: 'Roland',
        amps: 4,
        oscillators: 3,
        filters: 'LP'
      })
      .then(res => {
        expect(res.body).toEqual({
          manufacturer: 'Roland',
          amps: 4,
          oscillators: 3,
          filters: 'LP'
        });
      });
  });
});

