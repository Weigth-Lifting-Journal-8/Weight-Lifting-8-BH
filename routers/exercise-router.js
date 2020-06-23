const router = require('express').Router();

// IMPORT MODELS/MIDDLEWARE
const ExModel = require('../models/exercise-model.js');
const validateUser = require('../middleware/verify-middleware.js');
const validateWorkoutID = require('../middleware/validate-workout-id.js');
const validateExercise = require('../middleware/validate-exercise')


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


module.exports = router;