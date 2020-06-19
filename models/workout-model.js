const db = require('../data/dbConfig.js');

module.exports = {
    findWorkout,
    getWorkoutById,
    addWorkout,
    update,
    remove
}

// POSTS NEW WORKOUT
function addWorkout(data){
  return db('workouts')
      .insert(data, "id")
}


// FINDS ALL USER WORKOUTS
function findWorkout(userId){
  return db("workout as w")
      .select("w.id", "u.firstName", "w.workout_name", "w.date")
      .join("users as u", "w.user_id", "=", "u.id")
      .where("w.user_id", userId)
}


// GETS WORKOUT BY ID
function getWorkoutById(workout){
  return db('workout')
      .select('id','name', 'date')
      .where('id', workout)
};


// EDITS WORKOUT
function update(id, changes){
  return db('workout')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? getWorkoutById(id) : null))
}

// REMOVES WORKOUT
function remove(id){
  return db('workout')
      .where({id})
      .delete()
}