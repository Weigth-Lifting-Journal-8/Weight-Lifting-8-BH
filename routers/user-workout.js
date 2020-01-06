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
    // Provides ID, workout_name, date
router.get('/workouts/:workout', (req, res) => {
    const { workout } = req.params;
    console.log(req.params)

    UserModel.getWorkoutById(workout)
        .then(exercise => {
            // if(!workout){
            //     res.status(404).json({ message: "There is no workout by this id "})
            // } else {
                res.status(200).json(exercise)
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem receiving workout.'})
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


// DELETES INDIVIDUAL WORKOUT
router.delete('workouts/:id', validateUserId, (req, res) => {
    const id = req.params.id;

    UserModel.remove(id)
        .then(count => {
            if(count > 0){
                res.status(202).json({ message: "Workout Deleted."})
            } else {
                res.status(404).json({ message: "Workout does not exist"})
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem deleting workout.'})
        })
})


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