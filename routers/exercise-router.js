const router = require('express').Router();

// IMPORT MODELS/MIDDLEWARE
const ExModel = require('../models/exercise-model.js');
const validateUser = require('../middleware/verify-middleware.js');
const validateWorkoutID = require('../middleware/validate-workout-id.js');
const validateExercise = require('../middleware/validate-exercise');
const validateExerciseID = require('../middleware/validate-exercise-id.js');

// Get a single exercise under a workout

// Get all exercises under a workout
router.get('/:id', validateWorkoutID, (req, res) => {
    const { id } = req.params;
    let message;
    
    ExModel.findById(id)
        .then(data => {
            message = !data.exercises.length ? 'This workout is empty.' : `Workout contains ${data.exercises.length} exercises.`;
            res.status(200).json({data, message})
        })
        .catch(err => {
            err.message,
            res.status(500).json({ message: "There was a problem connecting to workout and exercise."})
        })
})


// POSTS EXERCISE UNDER WORKOUT
router.post('/:id', validateUser, validateWorkoutID, (req, res) => {
    const newExercise = req.body;
    const { id } = req.params

    const validationResult = validateExercise(newExercise);
    if(validationResult.isSuccesful){
        ExModel.addExercise(newExercise, id)
            .then(workout => {
                res.status(201).json(workout)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    } else {
        res.status(400).json({
            errors: validationResult.errors
        })
    }
});

// Edit a Single Exercise from a workout
// :id = exercise_id, :workout_id, new_data = updated

    // Update model takes in id(exercise), workout_id, and new_data
    //      Does the Exercise ID Exist? // Middleware
    //      Does the Workout ID Exist?  // Middleware
    //      Can be incomplete data because we may just want to change one thing.
    //      if yes, replace the old data w/ new_data
    //      no, return a 400 bad request for each individual item
router.put('/:exercise_id/workout/:workout_id', validateExerciseID, (req, res) => {
    const new_data = req.body;
    const { exercise_id, workout_id } = req.params;
    ExModel.updateExercise(exercise_id, workout_id, new_data)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({ message: "Server could not update exercise."})
        })
})

// Delete Exercise
router.delete('/in_workout/:exercise_id', (req, res) =>{
    const { exercise_id } = req.params;

    ExModel.remove(exercise_id)
        .then(id => {
            if(id < 1){
                return res.status(400).json({ message: "There is no item of that id to be removed"})
            }
            res.status(200).json({ message: `Successfully removed exercise.`})
        })
        .catch(err => {
            res.status(500).json({ error: err.message, message: "Server could not process delete."})
        })
})



module.exports = router;