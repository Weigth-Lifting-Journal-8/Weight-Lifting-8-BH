const db = require('../data/dbConfig.js');

module.exports = {
    addUser, 
    findById,
    findByEmail,
    getAll,
    getUserById
}

// Registration Models
// Finds User By Email --> Used for registration Validation
function findByEmail(email){
    return db('users')
    .where({ email })
    .first()
}
// ADDs a user to the database ---> Registration
function addUser(user){
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        })
}

// Accessing User Information
// Finds User By ID
function findById(id){
    return db('users')
        .where({ id })
        .first()
}

// FINDS ALL USERS
function getAll(){
    return db('users')
        .orderBy('id')

}

// FINDS BY ID, RETURNS ALL USER DATA
async function getUserById(id){
    let workouts = [];

    const user = await db('users')
        .where({ id })
        .select('id', 'email', 'created_at', 'updated_at')
        .first()
    // User exists, return all workouts for that user
    if(user) {
        workouts = await db('workouts as w')
            .leftJoin('exercises as e', 'w.id', 'e.workout_id')
            // .leftJoin('workout_exercises as we', 'we.workout_id', 'w.id')
            .select('w.id', 'w.name')
            .where({ user_id: id })
            .groupBy('w.id')
            .count('e.id as exercises')

            return await {
                ...user,
                workouts: workouts
            }

    }
}
