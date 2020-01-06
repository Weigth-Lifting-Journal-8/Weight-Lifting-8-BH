const db = require('../data/dbConfig.js');

module.exports = {
    getAll,
    findWorkout,
    getWorkoutById,
    getUserById,
    addWorkout,
    update,
    remove
}

// FINDS ALL USERS
function getAll(){
    return db('users');
}

// FINDS BY ID
function getUserById(id){
    return db('users').where({ id }).first();
}

// FINDS A WORKOUT
function findWorkout(userId){
    return db("workout as w")
        .select("w.id", "u.firstName", "w.workout_name", "w.date")
        .join("users as u", "w.user_id", "=", "u.id")
        .where("w.user_id", userId)
}

// POSTS NEW WORKOUT
function addWorkout(data){
    return db('workout')
        .insert(data, "id")
        .then(ids => {
            const [id] = ids;

            return getWorkoutById(id);
        });
}

// GETS WORKOUT BY ID
function getWorkoutById(workout){
    return db('workout')
        .select('id','workout_name', 'date')
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