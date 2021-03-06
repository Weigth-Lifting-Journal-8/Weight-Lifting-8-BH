const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js')

const app = request(server);

let token;

describe('EXERCISE-ROUTER', () => {
    beforeEach((done) => {
        app.post('/api/auth/login')
            .send({
                email: 'test2@email.com', 
                password: 'password'     
            })
            .end((err, res) => {
                token = res.body.token,
                err,
                done()
            })
    })
    describe("GET /", () => {
        it('Returns a 200 OK', async() => {
            await app
                .get('/api/exercises/')
                .set('Authorization', `${token}`)
                .then(res => {
                    expect(res.status).toBe(200);
                })   
        })
    })
})