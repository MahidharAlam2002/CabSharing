const request = require('supertest');
const app = require('./../app');


test('GET /places', async () => {
    const res = await request(app).get('/places');


    expect(res.status).toBe(200);
});