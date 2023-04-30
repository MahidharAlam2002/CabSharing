const request = require('supertest');
const app = require('./../app');


test('POST /schedules', async () => {
    const newSchedule = {schedule_id: '34567'};
    const res = await request(app).post('/schedules').send(newSchedule);

    expect(res.text).toBe('done');
});