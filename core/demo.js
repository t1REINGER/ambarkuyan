import { workouts } from "./sample-data.js";
import {
  addSet,
  estimateOneRepMax,
  formatSet,
  formatWorkout,
  getBestSetReduce,
  getBestSetSorted,
  getFirstSet,
  getSetVolume,
  getSetsByExercise,
  getTotalReps,
  getVolumeByExercise,
  getWorkoutVolume,
  groupSetsByExercise,
  hasExercise,
  renameWorkout,
} from "./stats.js";

const [workout] = workouts;

console.log("--- Set ---");
console.log(getSetVolume(workout.sets[0]));
console.log(formatSet(workout.sets[1]));
console.log(formatSet(workout.sets[1], "lbs"));
console.log(estimateOneRepMax(workout.sets[1]));

console.log("--- Workout copies ---");
console.log(addSet(workout, { exercise: "Dips", reps: 12, weight: 0 }));
console.log(renameWorkout(workout, "Upper body"));
console.log(workout.sets.length, workout.title); // оригинал не изменился

console.log("--- Workout stats ---");
console.log(getFirstSet(workout));
console.log(getWorkoutVolume(workout));
console.log(getTotalReps(workout));
console.log(getSetsByExercise(workout, "Bench press"));
console.log(formatWorkout(workout));
console.log(getBestSetSorted(workout));
console.log(getBestSetReduce(workout));
console.log(hasExercise(workout, "Pull-ups"));
console.log(groupSetsByExercise(workout));
console.log(getVolumeByExercise(workout));
