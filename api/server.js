// IMPORT DEPENDENCIES
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


// IMPORT AUTH


// SETTING UP SERVER
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// SET UP BASIC ENDPOINTS
server.get('/', (req, res) => {
    res.status(200).json('Server is running!')
})

server.us

