// Used to see if a workout name has been created. (may or may not need)
const User = require('../models/auth-model.js')
// Create model to get workout by name or id
async function validateWorkout(req, res, next){ 
  const workout_id = req.params.id;
  const { name } = req.body;

  const user_workouts = await User.getUserById(workout_id)
  
  if(user_workouts.workouts.length){
    const workout_list = await user_workouts.workouts.map(workout => workout.name)
    if(workout_list.includes(name)){
      return res.status(404).json({ message: `Your journal already contains ${name} as a workout.` })
    } 
  }
  next()
}

module.exports = validateWorkout;
