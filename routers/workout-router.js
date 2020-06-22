const router = require('express').Router();

const Workouts = require('../models/workout-model.js');
const Users = require('../models/auth-model.js');
const validateWorkout = require('../middleware/validate-workout.js');
const validateUser = require('../middleware/validate-user.js');
const validateWorkoutID = require('../middleware/validate-workout-id.js');
// Get All Workouts For a User
router.get('/:id', validateUser, (req, res) => {
    const { id } = req.params;

    Workouts.findWorkout(id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: err.message}))
})

// Adds workout for User
router.post('/:id', validateUser, validateWorkout, (req, res) => {
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

// Edits Single Workout By ID --> returns updated item w/ id, name, date
router.put('/:id', validateWorkoutID, (req, res) => {
    const new_data = req.body;
    const { id } = req.params;
    
    Workouts.update(id, new_data)
        .then(workout => {
            res.status(200).json(workout)
        })
        .catch(err => {
            res.status(500).json({ error: 'server could not edit workout', error_message: err.message})
        })
})










module.exports = router;