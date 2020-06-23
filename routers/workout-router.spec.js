const request = require('supertest');
const server = require('../api/server.js');

const app = request(server);

let token;

describe('WORKOUT-ROUTER', () => {
    beforeEach((done) => {
        app.post('/api/auth/login')
            .send({
                email: 'test2@email.com', 
                password: 'password'
            })
            .end((err, res) => {
                token = res.body.token;
                done()
            })
    })
    describe("POST /:id", () => {
        it("Returns 201", async() => {
            return app
                .post("/api/workouts/1")
                .set('Authorization', `${token}`)
                .send({
                    "date": "3/22/2020",
                    "workout_name": "Legs"
                })
                .then(res => {
                    console.log(res.body)
                    expect(res.status).toBe(201)
                })
        })
    });
    describe("GET /:userId/all", () => {
        it('Should Give 200 OK with Token', async () => {
            await app
                .get('/api/workouts/1/all')
                .set('Authorization', `${token}`)
                .then(res => {
                    console.log(res.status)
                    expect(res.status).toBe(200);
                })
        })
        it('Should return an array of workouts', async () => {
            await app
                .get('/api/workouts/1/all')
                .set('Authorization', `${token}`)
                .then(res => {
                    expect(res.body).toEqual(res.body);
                })
        })
    })
});