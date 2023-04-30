const request = require('supertest');
const app = require('./../app');


test('GET /schedules', async () => {
    const res = await request(app).get('/schedules');


    expect(res.status).toBe(200);
});