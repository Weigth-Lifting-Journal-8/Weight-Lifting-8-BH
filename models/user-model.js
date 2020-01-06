const db = require('../data/dbConfig.js');

module.exports = {
    findWorkout,
    find,
    findUserById,
    // addWorkout,
    // update,
    // remove
}

// FINDS ALL USERS
function find(){
    return db('workouts')
}

// FINDS BY ID
function findUserById(id){
    return db('users').where({ id }).first();
}

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