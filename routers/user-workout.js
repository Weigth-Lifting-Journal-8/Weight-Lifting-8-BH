const router = require('express').Router();

const UserModel = require('../models/user-model.js');



// GETS ALL USERS
router.get('/', (req, res) => {
    UserModel.getAll()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to load users'})
        })
})

// GET USER BY ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    UserModel.getUserById(id)
        .then(user => {
            if(!user){
                res.status(404).json({ message: "Could not find id."})
            } else {
                res.json(user)
            }      
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem receiving user.'})
        })
})

// GET USER WORKOUTS
// GIVES FIRST NAME, WORKOUT_NAME, AND DATE
router.get('/:id/workouts', validateUserId, (req, res) => {
    const id = req.params.id;

    UserModel.findWorkout(id)
        .then(workout => {
            res.status(200).json(workout)
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem receiving user.'})
        })
})

// GETS INDIVIDUAL WORKOUT
router.get('/workouts/:id', validateUserId, (req, res) => {
    const id = req.params.id;

    UserModel.getWorkoutById(id)
        .then(workout => {
            res.status(200).json(workout)
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem receiving user.'})
        })
})



// POST WORKOUT, Adds new workout, 
    // generates new user_id for workout, 
    // date (optional)
    // workout title required
router.post('/:id/workouts', validateUserId, (req, res) => {
    const newWorkout = req.body;
    newWorkout.user_id = req.params.id;

    if(!newWorkout.workout_name){
        res.status(400).json({ message: "Workout needs a name."})
    } else {
    UserModel.addWorkout(newWorkout)
        .then(workout => {
                res.status(201).json(workout)
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem posting workout.'})
        })
}})

// MIDDLEWARE
function validateUserId(req, res, next) {
    const id = req.params.id;
 
    UserModel.getUserById(id)
       .then(user => {
          if (!user) {
             res.status(404).json({ message: 'There is no such user by that id' });
          } else {
             next();
          }
       });
 }
module.exports = router;