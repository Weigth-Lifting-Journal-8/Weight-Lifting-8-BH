const ExModel = require('../models/exercise-model.js');
// Validate Exercise ID
module.exports = (req, res, next) => {
  ExModel.findExById(req.params.exercise_id)
    .then(workout => {
      if(workout){
        next()
      } else {
        res.status(400).json({ message: `Exercise with the ID of ${req.params.exercise_id} does not exist.`})
      }
    })
    .catch(err => {
      res.status(500).json({ error_message: 'Something went wrong with the server.', error: err.message})
    })
}