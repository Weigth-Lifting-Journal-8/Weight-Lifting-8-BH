// Used to see if a workout name has been created. (may or may not need)
const Workout = require('../models/workout-model.js')
const User = require('../models/auth-model.js')
// Create model to get workout by name or id
async function validateWorkout(req, res, next){ 
  const id = req.params.id;
  const { name } = req.body;
  console.log("name", name)
  const user_workouts = await User.getUserById(id)
  console.log("user workouts", user_workouts.workouts)

  if(user_workouts.workouts.length){
    const workout_list = await user_workouts.workouts.map(workout => workout.name)
    console.log("list", workout_list)
    if(workout_list.includes(name)){
      return res.status(404).json({ message: "Your journal already contains this workout." })
    } else {
      next()
    }
  }
}

module.exports = validateWorkout;
// Get list of user workouts
// create a dictionary of them to look up
        // if the name is in the dictionary? O(1) lookup
// check to see if name matches
//    if name matches, sent response 400 that the workout has already been created
//    else allow it move to the next step. 