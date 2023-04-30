const request = require('supertest');
const app = require('./../app');


test('POST /users', async () => {
    const newUser = {google_id: '45678765'};
    const res = await request(app).post('/users').send(newUser);

    expect(res.text).toBe('done');
});