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
  return db("workouts as w")
      .select("w.id", "w.name", "w.date")
      .join("users as u", "w.user_id", "=", "u.id")
      .where("w.user_id", userId)
}


// GETS WORKOUT BY ID
function getWorkoutById(workout){
  return db('workouts')
      .select('id','name', 'date')
      .where('id', workout)
};


// EDITS WORKOUT
function update(id, changes){
  return db('workouts')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? getWorkoutById(id) : null))
}

// REMOVES WORKOUT
function remove(id){
  return db('workouts')
      .where({ id })
      .delete()
}