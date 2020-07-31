const db = require('../data/dbConfig.js');

module.exports = {
    addExercise,
    findById,
    updateExercise,
    findExById, 
    remove
}
// Find Exercise By exercise ID
function findExById(id){
    return db('exercises')
        .where({ id })
        .first()
}

//Find Workout ID and return all exercises associated
async function findById(workout_id){
    const weights = await db(`workouts as w`)
        .select('w.id as workout_id','w.name as workout_name')
        .where({ id: workout_id })
        .first()
    // Find exercises associated with that workout
    if(weights){
        const exercises = await db('exercises as e')
            .join('workouts as w', 'e.workout_id', 'w.id')
            .select(
                'e.id as exercise_id',
                'e.exercise',
                'e.region',
                'e.sets',
                'e.reps',
                'e.weight'
            )
            .where({ workout_id })
        return {
            ...weights,
            exercises: exercises,
        }
    }   
    return weights
}
// Adds Exercise To A Workout
function addExercise(exerciseInfo){
    return db('exercises')
        .insert(exerciseInfo, "id")
        .then(ids => {
            const [ id ] = ids;
            return findExById(id) 
        })
}

// Edit a single exercise
async function updateExercise(id, exercise_data){
    const { exercise, region, sets, reps, weight } = exercise_data;
    // Get Workout Data 
    const curr_exercise = await db('exercises')
        .where({ id })
        .first()
    // if exercise exists, update information on workout_exercises
    if(curr_exercise){
       const new_exercise = await db('exercises')
            .update({
                exercise,
                region,
                reps, 
                sets, 
                weight, 
            })
            .where({ id })
            .returning('id')
            return new_exercise;
    } 
}

// Deletes Exercise only from Workout, NOT FROM EXISTENCE
function remove(id){
    return db('exercises')
        .where({ id })
        .first()
        .del()
}








