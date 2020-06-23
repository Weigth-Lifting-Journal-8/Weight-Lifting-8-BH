const db = require('../data/dbConfig.js');

module.exports = {
    addExercise,
    findById
}

//Find ID
async function findById(workout_id){
    const weights = await db(`workouts as w`)
        .select(
            'w.id as workout_id',
            'w.name as workout_name'
            )
        .where({ id: workout_id })
        .first()
    console.log("weights", weights)
    // Find exercises associated with that workout
    if(weights){
        const exercises = await db('workout_exercises as we')
            .join('workouts as w', 'we.workout_id', 'w.id')
            .join('exercises as e', 'we.exercise_id', 'e.id')
            .select(
                'we.id as user_exercise_id',
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
            exercises: exercises 
        }
    }
        
    return weights

}
// Add Exercise

// Input: WorkoutID, Exercise Information (name, region, sets, reps)
// Output: Exercise is added to db. Through WE & E db's.

// Possible Middleware: Check if workout ID exists, check if Exercise ID exists
//      Collect Exercise Information: add to exercise DB (name, region)
//      Connect ExcerciseID and WorkoutID for Foreign Keys
//          Exercise_id = exercise.id
//          workout_id = (passed in parameter)
//
async function addExercise(exerciseInfo, workout_id){
    // Get exercise data
    const exercise = await db('exercises')
        .where({ name: exerciseInfo.name })
        .first()
    // if it exists, add to workout/exercises
    if(exercise){
        await db('workout_exercises')
            .insert({
                reps: exerciseInfo.reps,
                sets: exerciseInfo.sets,
                weight: exerciseInfo.weight,
                workout_id: workout_id,
                exercise_id: exercise.id
            })
            .returning('id')
    } else {
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
    }
    return await findById(workout_id)
}
// Add an exercise to a specific workout. 
//      Make sure WorkoutId exists
//          if yes, add it under the workout
// 


// Get all exercise for single workout
// Get a single exercise
// Edit a single exercise
// Delete a Single exercise







