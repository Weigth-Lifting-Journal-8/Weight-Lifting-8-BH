const db = require('../data/dbConfig.js');

module.exports = {
    getAllExercises,
    exerciseById,
    exercisesInWO,
    addExercise,
    updateEx,
    removeEx,

    region,
    byId
}

// FINDS ALL Exercises w/ Body Part
function getAllExercises(){
    return db('exercises as e')
        .select("w.workout_name", "e.exercise", "e.weight", "e.sets", "e.reps")
        .join("workout as w", "e.workout_id", "=", "w.id");
};

// FINDS BY ID ----> Gives back specific workoutname for id
function exerciseById(id){
    return db('exercises as e')
        .select("e.id", "w.workout_name", "e.exercise", "e.weight", "e.sets", "e.reps")
        .join("workout as w", "e.workout_id", "=", "w.id")
        .where('e.id', id)
        .first()
}

// ORIGINAL EXERCISE BY ID -----> Backup == Just in case
function byId(id){
    return db('exercises as e')
        .select("e.id", "w.workout_name", "e.exercise", "e.weight", "e.sets", "e.reps")
        .join("workout as w", "e.workout_id", "=", "w.id")
        .where('e.workout_id', id)
        .first()
}

// FIND BY BODY PART -----> TEST
function region(region){
    return db('exercises as e')
        .select("w.workout_name", "e.exercise")
        .join("workout as w", "e.workout_id", "=", "w.id")
        .where("w.workout_name", region);
}

// FINDS EXERCISES FOR USER
function exercisesInWO(workoutId){
    return db("exercises as e")
        .select("e.id","w.workout_name", "e.exercise", "e.weight", "e.sets", "e.reps")
        .join("workout as w", "e.workout_id", "=", "w.id")
        .where("w.workout_name", workoutId);
}

// POSTS NEW EXERCISE
function addExercise(data){
    return db('exercises')
        .insert(data, "id")
        .then(ids => {
            const [id] = ids;

            return exerciseById(id)
        });
}

// EDITS Exercise
function updateEx(id, changes){
    return db('exercises')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? exerciseById(id) : null))
}

// REMOVES Exercise
function removeEx(id){
    return db('exercises')
        .where({id})
        .delete()
}