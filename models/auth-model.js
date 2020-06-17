const db = require('../data/dbConfig.js');

module.exports = {
    addUser, 
    findBy,
    findById,
    findByEmail
    // find
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
// Finds User By ID
function findById(id){
    return db('users')
        .where({ id })
        .first()
}

// Finds User By Email
function findByEmail(email){
    return db('users')
        .where({ email })
        .first()
}


function findBy(users){
    return db('users')
        .where(users)
}