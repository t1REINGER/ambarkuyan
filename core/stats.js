const workout = {
  id: 1,
  title: "Push day",
  date: "2026-10-26",
  sets: [
    { exercise: "Bench press", reps: 10, weight: 60 },
    { exercise: "Bench press", reps: 8, weight: 70 },
    { exercise: "Pull-ups", reps: 6, weight: 10 },
  ],
};

const getSetVolume = ({ reps, weight }) => reps * weight;
console.log(getSetVolume(workout.sets[0]));
console.log(getSetVolume(workout.sets[2]));

const formatSet = ({ exercise, reps, weight }, unit = "kg") =>
  `${exercise}: ${reps} x ${weight} ${unit}`;
console.log(formatSet(workout.sets[1]));
console.log(formatSet(workout.sets[1], "lbs"));

const estimateOneRepMax = ({ reps, weight }) => {
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30) * 10) / 10;
};
console.log(estimateOneRepMax(workout.sets[1]));

const addSet = (workout, newSet) => ({
  ...workout,
  sets: [...workout.sets, newSet],
});
console.log(addSet(workout, { exercise: "Legs", reps: 12, weight: 50 }));

const renameWorkout = (workout, newName) => ({
  ...workout,
  title: newName,
});
console.log(renameWorkout(workout, "MyWorkout"));

const getFirstSet = ({ sets: [firstSet] }) => firstSet;
console.log(getFirstSet(workout));

const getWorkoutVolume = (workout) =>
  workout.sets.reduce((total, set) => total + getSetVolume(set), 0);
console.log(getWorkoutVolume(workout));

const getTotalReps = (workout) =>
  workout.sets.reduce((total, set) => total + set.reps, 0);
console.log(getTotalReps(workout));

const getSetsByExercise = (workout, exercise) =>
  workout.sets.filter((set) => set.exercise === exercise);
console.log(getSetsByExercise(workout, "Bench press"));

const formatWorkout = (workout) =>
  workout.sets.map((set) => formatSet(set)).join("\n");
console.log(formatWorkout(workout));

const getBestSet = (workout) =>
  workout.sets.toSorted(
    (set1, set2) => estimateOneRepMax(set2) - estimateOneRepMax(set1),
  )[0];
console.log(getBestSet(workout));

const getBestSetReduce = (workout) =>
  workout.sets.reduce(
    (best, set) =>
      estimateOneRepMax(best) > estimateOneRepMax(set) ? best : set,
    workout.sets[0],
  );
console.log(getBestSetReduce(workout));

const hasExercise = (workout, exercise) =>
  workout.sets.some((set) => set.exercise === exercise);
console.log(hasExercise(workout, "Bench press"));

const groupSetsByExercise = (workout) =>
  workout.sets.reduce(
    (sets, set) => ({
      ...sets,
      [set.exercise]: [...(sets[set.exercise] ?? []), set],
    }),
    {},
  );

const getVolumeByExercise = (workout) =>
  workout.sets.reduce(
    (groups, set) => ({
      ...groups,
      [set.exercise]: (groups[set.exercise] ?? 0) + getSetVolume(set),
    }),
    {},
  );
console.log(getVolumeByExercise(workout));
