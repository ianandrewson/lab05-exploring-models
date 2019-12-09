const app = require('../lib/app');
const request = require('supertest');
jest.setTimeout(10000);
const mongoose = require('mongoose');

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
          _id: expect.any(String),
          __v: 0,
          manufacturer: 'Roland',
          amps: 4,
          oscillators: 3,
          filters: 'LP',
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });
  it('has a route that can update a specific Synth', () => {
    return request(app)
      .post('/synths')
      .send({
        manufacturer: 'Moog',
        amps: 1,
        oscillators: 4,
        filters: 'LP'
      })
      .then(res => {
        const id = res.body._id;
        return request(app)
          .put(`/synths/${id}`)
          .send({
            manufacturer: 'DSI',
            amps: 2
          })
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              __v: 0,
              manufacturer: 'DSI',
              amps: 2,
              oscillators: 4,
              filters: 'LP',
              createdAt: expect.any(String),
              updatedAt: expect.any(String)
            });
          });
      });
  });
  it('has a route that will delete a Synth by id', () => {
    return request(app)
      .post('/synths')
      .send({
        manufacturer: 'Moog',
        amps: 1,
        oscillators: 4,
        filters: 'LP'
      })
      .then(res => {
        const id = res.body._id;
        return request(app)
          .delete(`/synths/${id}`)
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              __v: 0,
              manufacturer: 'Moog',
              amps: 1,
              oscillators: 4,
              filters: 'LP',
              createdAt: expect.any(String),
              updatedAt: expect.any(String)
            });
          });
      });
  });
  it('should be able to get all synths in the database', () => {
    return request(app)
      .post('/synths')
      .send({
        manufacturer: 'Korg',
        oscillators: 1,
        filters: 'BP',
        amps: 1
      })
      .then(() => {
        return request(app)
          .get('/synths')
          .then(res => {
            expect(res.body.length).toBeGreaterThanOrEqual(1);
          });
      })
      .then(mongoose.close());
  });
});

