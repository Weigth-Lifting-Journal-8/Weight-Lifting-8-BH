const db = require('../data/dbConfig.js');

module.exports = {
    getAll,
    findWorkout,
    getWorkoutById,
    getUserById,
    addWorkout,
    // update,
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

// FINDS A WORKOUT & PROVIDES NAME
function findWorkout(userId){
    return db("workout as w")
        .select("w.id","u.firstName", "w.workout_name", "w.date")
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
function getWorkoutById(id){
    return db('workout')
        .where('id', id)
        .first()
};

// REMOVES WORKOUT
function remove(id){
    return db('workout')
        .where('id', Number(id))
        .first()
        .then(workouts => {
            if(!workouts){
                return null
            } else {
                return db('workout')
                    .where({ id })
                    .del()
                    .then(() => {
                        return workouts
                    })
            }
        })
}