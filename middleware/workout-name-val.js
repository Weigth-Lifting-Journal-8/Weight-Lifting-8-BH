const Workout = require('../models/workout-model.js');
// Verifies Workout By Name ---> Not used (6/23)
module.exports = (req, res, next) => {
  Workout.workoutName(req.params.workout)
    .then(workout => {
      if(workout){
        next()
      } else {
        res.status(400).json({ message: `${req.params.workout} does not exist.`})
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message})
    })
}