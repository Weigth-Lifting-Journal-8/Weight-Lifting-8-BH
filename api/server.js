// IMPORT DEPENDENCIES
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Validation Middleware
const restricted = require("../middleware/verify-middleware.js")


// IMPORT AUTH ROUTER
const authRouter = require('../routers/users-router.js');

// IMPORT ROUTERS
const workoutRouter = require('../routers/workout-router.js');
const exerciseRouter = require('../routers/exercise-router.js');

// SETTING UP SERVER
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// RUNNING UNDER http://localhost:4000/login and /register
server.use('/api/auth', authRouter); // -----> AUTHENTICATION
server.use('/api/workouts', restricted, workoutRouter); // -----> WORKOUT JOURNAL
server.use('/api/exercises', restricted, exerciseRouter); // -----> EXERCISES IN JOURNAL

// SET UP BASIC ENDPOINTS
server.get('/', (req, res) => {
    res.status(200).json('Server is running!')
})

module.exports = server;

