const request = require('supertest');
const db = require('../data/dbConfig.js');

const server = require('./server.js');


describe('SERVER & AUTHORIZATION', () => {
    describe("Server", function(){
        describe('GET /', function(){
            it("should return 200 OK", function(){
                return request(server)
                    .get("/")
                    .then(res => {
                        expect(res.status).toBe(200)
                })
            })
            it("Needs JSON formatted response", async() => {
                const res= await request(server)
                    .get("/")
                        expect(res.type).toMatch(/json/i);
            })
        })
    })
    
    describe('POST /login', () => {
        describe('log in user', () => {
            it('needs to return 200 OK', async () => {
                const res = await request(server)
                    .post('/api/auth/login')
                    .send({ email: 'test2@email.com', password: 'password'});
                expect(res.status).toBe(200);
            });
    
            it('returns json', async () => {
                const res = await request(server)
                    .post('/api/auth/login')
                    .send({email: 'test2@email.com', password: 'password'});
                expect(res.type).toMatch(/json/i);
            });
        });
    });
    
    describe('POST /register', () => {
        describe('adds user', () => {
            beforeEach(async () => {
                await db('users').truncate();
            });
    
            it('needs to return 201 OK', async () => {
                const res = await request(server)
                    .post('/api/auth/register')
                    .send({ email: "test2@email.com", password: "password"});
                expect(res.status).toBe(201);
            });
    
            it('validates', async () => {
                const res = await request(server)
                    .post('/api/auth/register')
                    .send({ email: "test2@email.com", password: "password"});
                expect(res.body.error).toBe(undefined);
            });
        });
    });
});