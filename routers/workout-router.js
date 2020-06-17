const router = require('express').Router();

const Workouts = require('../models/workout-model.js');
const Users = require('../models/auth-model.js');
const middleware = require('../middleware/verify-middleware.js');
const validateUserId = require('../middleware/validate.js');



// Adds workout for User
router.post('/:id', validateUserId, (req, res) => {
    const workout_data = req.body;
    const { id } = req.params;

    console.log("workout data", workout_data)
    console.log(id)

    if(!workout_data.name){
        res.status(400).json({ message: "Please provide a name for this workout."})
    }
    Workouts.addWorkout({
        ...workout_data,
        user_id: id,
    })
    .then(data => res.status(201).json(console.log(data)))
    .catch(err => res.status(500).json({ error: "The server failed to add your workout."}))
})











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
router.get('/:id', middleware, (req, res) => {
    const id = req.params.id;

    Workouts.getUserById(id)
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
router.get('/:userId/all', validateUserId, middleware, (req, res) => {
    const {userId} = req.params;

    Workouts.findWorkout(userId)
        .then(workout => {
            res.status(200).json(workout)
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem receiving workouts.'})
        })
})

// GETS INDIVIDUAL WORKOUT
    // Provides ID, workout_name, date
router.get('/:userId/:workout', validateUserId, middleware, (req, res) => {
    const { workout } = req.params;
    // const { userId } = req.params;

    // console.log(req.params)

    Workouts.getWorkoutById(workout)
        .then(exercise => {
            if(exercise.length === 0){
                res.status(404).json({ message: "There is no workout by this id "})
            } else {
                res.status(200).json(exercise)
        }})
        .catch(err => {
            res.status(500).json({ message: 'Problem receiving workout.'})
        })
})

// POST WORKOUT, Adds new workout, 
    // generates new user_id for workout, 
    // date
    // workout title required
router.post('/:id', middleware, (req, res) => {
    const newWorkout = req.body;
    newWorkout.user_id = req.params.id;


    if(!newWorkout.workout_name){
        res.status(400).json({ message: "Workout needs a name."})
    } else if (!newWorkout.date){
        res.status(400).json({ message: "Workout needs a date."})
    } else {
        Workouts.addWorkout(newWorkout)
            .then(workout => {
                    res.status(201).json(workout)
            })
            .catch(err => {
                res.status(500).json({ message: 'Problem posting workout.'})
            })
}})

// EDITS INDIVIDUAL WORKOUT
router.put('/:id', middleware, (req, res) => {
    const id = req.params.id;

    Workouts.update(id, req.body)
        .then(update => {
            console.log("Update", req.body)
            if(!req.body.workout_name){
                res.status(400).json({ message: "Need a workout name"})
            } else if(!req.body.date){
                res.status(400).json({ message: "Need a workout date"})
            } else {
                res.status(202).json(update)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Problem updating workout.'})
        })

})





// DELETES INDIVIDUAL WORKOUT
router.delete('/:id', middleware, (req, res) => {
    const id = req.params.id;

    console.log(req.params)
    Workouts.remove(id)
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


module.exports = router;