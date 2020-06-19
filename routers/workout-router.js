const router = require('express').Router();

const Workouts = require('../models/workout-model.js');
const Users = require('../models/auth-model.js');
const middleware = require('../middleware/verify-middleware.js');
const validateUserId = require('../middleware/validate.js');



// Adds workout for User
router.post('/:id/workouts', (req, res) => {
    const workout_data = req.body;
    const { id } = req.params;

    if(!workout_data.name){
        return res.status(400).json({ message: "Please provide a name for this workout."})
    }
    Workouts.addWorkout({
            ...workout_data,
            user_id: id
    })
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ error: "The server failed to add your workout.", message: err.message}))
})













module.exports = router;