const request = require('supertest');
const db = require('../data/dbConfig.js');
const workout = require('./workout-router.js');

describe('WORKOUT-ROUTER', () => {
    describe("GET /:userId/all", function (){
        it('Should Return Status 200 OK', async function() {
            const res = await request(workout)
                .get('/api/workouts/:userId/all')
                    expect(res.status).toBe(200)
        })
    })
});