const Workout = require('../models/workout-model.js');
// Verifies workout ID if it's in the DB.
module.exports = (req, res, next) => {

  Workout.getWorkoutById(req.params.id)
    .then(workout => {
      if(workout.length){
        next()
      } else {
        res.status(400).json({ message: `Workout with the ID of ${req.params.id} does not exist.`})
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message})
    })
}