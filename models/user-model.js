const db = require('../data/dbConfig.js');

module.exports = {
    getAll,
    findWorkout,
    // getWorkoutById,
    getUserById,
    addWorkout,
    // update,
    // remove
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
    // SELECT u.firstName as Name
    // , w.workout_name
    // , w.date
    // FROM workout as w
    //     Join users as u ON w.user_id = u.id;
    return db("workout as w")
        .select("u.firstName", "w.workout_name", "w.date")
        .join("users as u", "w.user_id", "=", "u.id")
        .where("w.user_id", userId)
}

// POSTS NEW WORKOUT
function addWorkout(data){
    return db('workout')
        .insert(data)
        .then(([id]) => findWorkout(id));
}

// GETS WORKOUT BY ID
// function getWorkoutById(id){
//     return db('workout')
//         .where('id', id)
//         .first()
// }