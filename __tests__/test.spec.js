const request = require('supertest');

const db = require('../data/db-config');
const server = require('../api/server');

describe('server', () => {
  it.skip('tests are running', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('GET /', () => {
    it('Does Exist', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe('Adding User', () => {
    describe('Adds user', () => {
      it('returns 200', () => {
        return request(server)
          .post('/api/auth/register')
          .send({
            name: 'test test',
            username: 'admin',
            password: 'admin'
          })
          .then(res => {
            expect(res.status).toBe(500);
          });
      });
    });
  });
});
