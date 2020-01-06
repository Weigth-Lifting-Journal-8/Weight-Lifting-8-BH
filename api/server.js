// IMPORT DEPENDENCIES
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


// IMPORT AUTH
const authRouter = require('../routers/users-router.js');

// IMPORT ROUTERS
const userRouter = require('../routers/workout-router.js');

// SETTING UP SERVER
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// RUNNING UNDER http://localhost:4000/login and /register
server.use('/api/auth', authRouter);
server.use('/api/user', userRouter);
// server.use('/exercises')

// SET UP BASIC ENDPOINTS
server.get('/', (req, res) => {
    res.status(200).json('Server is running!')
})

module.exports = server;

