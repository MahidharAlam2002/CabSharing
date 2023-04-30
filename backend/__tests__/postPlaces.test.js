const request = require('supertest');
const app = require('./../app');


test('POST /places', async () => {
    const newPlace = {place_name:'testPlace'};
    const res = await request(app).post('/places').send(newPlace);

    expect(res.text).toBe('done');
});