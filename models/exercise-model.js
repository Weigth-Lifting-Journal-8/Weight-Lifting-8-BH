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
        .select(
            'w.id as workout_id',
            'w.name as workout_name'
            )
        .where({ id: workout_id })
        .first()
    // Find exercises associated with that workout
    if(weights){
        const exercises = await db('workout_exercises as we')
            .join('workouts as w', 'we.workout_id', 'w.id')
            .join('exercises as e', 'we.exercise_id', 'e.id')
            .select(
                'e.id as exercise_id',
                'e.name as exercise_name',
                'e.region',
                'we.sets',
                'we.reps',
                'we.weight'
            )
            .where({ workout_id })
        // object w/workout and list of exercises
        return {
            ...weights,
            exercises: exercises,
        }
    }   
    return weights
}
// Adds Exercise To A Workout
async function addExercise(exerciseInfo, workout_id){
    // Get exercise data
    // const exercise = await db('exercises')
    //     .where({ name: exerciseInfo.name })
    //     .first()
    // // if it exists, add to workout/exercises
    // if(exercise){
    //     await db('workout_exercises')
    //         .insert({
    //             reps: exerciseInfo.reps,
    //             sets: exerciseInfo.sets,
    //             weight: exerciseInfo.weight,
    //             workout_id: workout_id,
    //             exercise_id: exercise.id
    //         })
    //         .returning('id')
    // } else {
        // Add to exercise db, then w/e
        const [ id ] = await db('exercises')
            .insert({
                name: exerciseInfo.name,
                region: exerciseInfo.region
            })
            .returning('id');

        await db('workout_exercises')
            .insert({
                reps: exerciseInfo.reps,
                sets: exerciseInfo.sets,
                weight: exerciseInfo.weight,
                workout_id: workout_id,
                exercise_id: id
            })
            .returning('id')
    // }
    return await findById(workout_id)
}
// Edit a single exercise
async function updateExercise(id, workout_id, exercise_data){
    const { name, region, sets, reps, weight } = exercise_data;
    // Get Workout Data 
    const exercise = await db('exercises')
        .where({ id })
        .first()
    // if exercise exists, update information on workout_exercises
    if(exercise){
        console.log("UPDATE EXERCISE", exercise)
        await db('exercises')
            .update({
                name,
                region
            })
            .where({ id: exercise.id })
            .returning('id')
        return db('workout_exercises')
            .update({
                reps, 
                sets, 
                weight, 
                workout_id,
                exercise_id: exercise.id
            })       
            .where({ id: exercise.id })
    } 
}

// Deletes Exercise only from Workout, NOT FROM EXISTENCE
function remove(id){
    return db('exercises')
        .where({ id })
        .first()
        .del()
}








