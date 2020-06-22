const router = require('express').Router();

const Workouts = require('../models/workout-model.js');
const Users = require('../models/auth-model.js');
const validateWorkout = require('../middleware/validate-workout.js');
const validateUser = require('../middleware/validate-user.js');

// Get All Workouts For a User
router.get('/:id/workouts', validateUser, (req, res) => {
    const { id } = req.params;

    Workouts.findWorkout(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: err.message}))
})

// Adds workout for User
router.post('/:id/workouts', validateUser, validateWorkout, (req, res) => {
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