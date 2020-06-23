module.exports = (exercise) => {
  const errors = []

  if(!exercise.name){
    errors.push("Please provide name for exercise.")
  }
  if(!exercise.region){
    errors.push("Please provide region for exercise.")
  }
  if(!exercise.reps){
    errors.push("Please provide reps for each set.")
  }
  if(!exercise.sets){
    errors.push("Please provide sets for exercise.")
  }

  return {
    isSuccesful: !Boolean(errors.length),
    errors
  }
}