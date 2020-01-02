const db = require('../data/dbConfig.js');

module.exports = {
    addUser, 
    findBy,
    findById,
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

function findById(id){
    return db('users')
        .where({ id })
        .first()
}

function findBy(users){
    return db('users')
        .where(users)
}