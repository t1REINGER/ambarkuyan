export const getSetVolume = ({ reps, weight }) => reps * weight;

export const formatSet = ({ exercise, reps, weight }, unit = "kg") =>
  `${exercise}: ${reps} x ${weight} ${unit}`;

export const estimateOneRepMax = ({ reps, weight }) => {
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30) * 10) / 10;
};

export const addSet = (workout, newSet) => ({
  ...workout,
  sets: [...workout.sets, newSet],
});

export const renameWorkout = (workout, newName) => ({
  ...workout,
  title: newName,
});

export const getFirstSet = ({ sets: [firstSet] }) => firstSet;

export const getWorkoutVolume = (workout) =>
  workout.sets.reduce((total, set) => total + getSetVolume(set), 0);

export const getTotalReps = (workout) =>
  workout.sets.reduce((total, set) => total + set.reps, 0);

export const getSetsByExercise = (workout, exercise) =>
  workout.sets.filter((set) => set.exercise === exercise);

export const formatWorkout = (workout) =>
  workout.sets.map((set) => formatSet(set)).join("\n");

export const getBestSetSorted = (workout) =>
  workout.sets.toSorted(
    (set1, set2) => estimateOneRepMax(set2) - estimateOneRepMax(set1),
  )[0];

export const getBestSetReduce = (workout) =>
  workout.sets.reduce(
    (best, set) =>
      estimateOneRepMax(best) > estimateOneRepMax(set) ? best : set,
    workout.sets[0],
  );

export const hasExercise = (workout, exercise) =>
  workout.sets.some((set) => set.exercise === exercise);

export const groupSetsByExercise = (workout) =>
  workout.sets.reduce(
    (groups, set) => ({
      ...groups,
      [set.exercise]: [...(groups[set.exercise] ?? []), set],
    }),
    {},
  );

export const getVolumeByExercise = (workout) =>
  workout.sets.reduce(
    (groups, set) => ({
      ...groups,
      [set.exercise]: (groups[set.exercise] ?? 0) + getSetVolume(set),
    }),
    {},
  );

export const getExerciseSummary = (workout) =>
  Object.entries(groupSetsByExercise(workout)).map(([exercise, sets]) => ({
    exercise,
    sets: sets.length,
    volume: getWorkoutVolume({ sets }),
  }));

export const getPersonalRecords = (workouts) =>
  workouts
    .flatMap((workout) => workout.sets)
    .reduce(
      (records, set) => ({
        ...records,
        [set.exercise]: Math.max(
          records[set.exercise] ?? 0,
          estimateOneRepMax(set),
        ),
      }),
      {},
    );

export const getLatestWorkout = (workouts) =>
  workouts.toSorted((workout1, workout2) =>
    workout2.date.localeCompare(workout1.date),
  )[0];

export const formatPersonalRecords = (records) =>
  Object.entries(records)
    .map(([exercise, oneRepMax]) => `${exercise}: ${oneRepMax} kg`)
    .join("\n");
