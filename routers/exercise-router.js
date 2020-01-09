const router = require('express').Router();

// IMPORT MODELS/MIDDLEWARE
const ExModel = require('../models/exercise-model.js');
const middleware = require('../auth/verify-middleware.js');
const validateUserId = require('../auth/validate.js');


// GETS ALL EXERCISES INCLUDING BODYPART/REGION
router.get('/', middleware, (req, res) => {
    ExModel.getAllExercises()
        .then(movement => {
            res.json(movement)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load exercises', it: console.log(err)})
        })
});

// GETS WORKOUT BY ID
router.get('/:id', middleware, (req, res) => {
    const id = req.params.id;

    ExModel.exerciseById(id)
        .then(user => {
            if(!user){
                res.status(404).json({ message: "Could not find exercise id."})
            } else {
                res.json(user)
            }      
        })
        .catch(err => {
            res.status(500).json({ it: console.log(err),message: 'Problem receiving exercise.'})
        })
});

// GETS A LIST OF EXERCISES BY SPECIFIC USER WORKOUT
router.get('/:userId/:id', validateUserId, middleware, (req, res) => {
    const { id } = req.params;
    const { userId } = req.params;

    ExModel.exercisesInWO(id, userId)
        .then(exercise => {
            console.log(exercise)
            if(exercise.length > 0){
                res.status(200).json({ exercise})
            } else {
                res.status(404).json({ message: "Need to make a workout list."})
            }      
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem receiving exercise.'})
        })
});
//    ||////////////////////////////////////////////////////||
//    ||------------------TEST ENDPOINT---------------------||
//    ||////////////////////////////////////////////////////||
//       GETS A LIST OF EXERCISES BY SPECIFIC USER WORKOUT
// router.get('/region/:userId/:region', middleware, (req, res) => {
//     const { region } = req.params;
    
//     console.log(req.params);

//     ExModel.region(region)
//         .then(exercise => {
//                 res.status(200).json({ exercise })
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Problem receiving exercise.'})
//         })
// });

// POSTS EXERCISE UNDER WORKOUT
router.post('/:workout_id', middleware, (req, res) => {
    const newExercise = req.body;
    newExercise.workout_id = req.params.workout_id;

    if(!newExercise.exercise){
        res.status(400).json({ message: "Exercise needs a name."})
    } else if (!newExercise.weight){
        res.status(400).json({ message: "Exercise needs a weight."})
    } else if (!newExercise.sets){
        res.status(400).json({ message: "Exercise needs a number of sets."})
    } else if (!newExercise.reps){
        res.status(400).json({ message: "Exercise needs a number of reps."})
    } else {
        ExModel.addExercise(newExercise)
            .then(workout => {
                    res.status(201).json({workout, message: `Successfully added ${workout.exercise} to ${workout.workout_name}`})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ err, message: 'Problem posting workout.'})
            })
}});

// EDITS EXERCISE
router.put('/:id', middleware, (req, res) => {
    const id = req.params.id;
    const edit = req.body;

    ExModel.updateEx(id, edit)
        .then(update => {
            if(!update.exercise){
                res.status(400).json({ message: "Exercise needs a name."})
            } else if (!update.weight){
                res.status(400).json({ message: "Exercise needs a weight."})
            } else if (!update.sets){
                res.status(400).json({ message: "Exercise needs a number of sets."})
            } else if (!update.reps){
                res.status(400).json({ message: "Exercise needs a number of reps."})
            } else {
                res.status(201).json({update, message: `Successfully edited ${update.exercise}`})
        }})
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Problem editing workout.'})
        })
});

// DELETES EXERCISE
router.delete('/:id', middleware, (req, res) => {
    const id = req.params.id;

    console.log(req.params)
    ExModel.removeEx(id)
        .then(count => {
            if(count > 0){
                res.status(202).json({ message: "Exercise Deleted."})
            } else {
                res.status(404).json({ message: "Exercise does not exist"})
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem deleting workout.'})
        })
})

module.exports = router;