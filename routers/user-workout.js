const router = require('express').Router();

const UserModel = require('../models/user-model.js');



// GETS ALL USERS
router.get('/', (req, res) => {
    UserModel.find()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load users'})
        })
})
// GET USER BY ID
router.get('/', (req, res) => {
    UserModel.find()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load users'})
        })
})


module.exports = router;