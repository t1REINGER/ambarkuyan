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
