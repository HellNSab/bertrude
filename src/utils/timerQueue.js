export const EXERCISE_POOL = {
  1: [
    { name: "Rope Skipping", icon: "Zap", desc: "High-intensity coordination & cardio" },
    { name: "Squats", icon: "Accessibility", desc: "Goblet or bodyweight squats for lower body power" },
    { name: "Dumbbell Press / Thrusters", icon: "Dumbbell", desc: "Upper body press & core stability" }
  ],
  2: [
    { name: "Dips", icon: "Trophy", desc: "Bench or chair dips targeting triceps & chest" },
    { name: "Lunges", icon: "Footprints", desc: "Unilateral leg strength & balance" },
    { name: "Plank", icon: "Shield", desc: "Isometric core hold" }
  ],
  3: [
    { name: "Dumbbell Rows / Renegade Rows", icon: "Award", desc: "Upper back pulling & core stability" },
    { name: "Kettlebell / Dumbbell Swings", icon: "Activity", desc: "Hip hinge power & posterior chain" },
    { name: "Core Twists", icon: "Shield", desc: "Dynamic twists" }
  ]
};

export function generateTimerQueue(durationMinutes) {
  const queue = [];
  const roundsCount = durationMinutes / 10; // 10m -> 1, 20m -> 2, 30m -> 3

  for (let r = 1; r <= roundsCount; r++) {
    const roundExercises = EXERCISE_POOL[r];

    for (let s = 1; s <= 3; s++) { // 3 sets
      for (let e = 0; e < 3; e++) { // 3 exercises
        const exercise = roundExercises[e];

        // 1. Work interval (50 seconds)
        queue.push({
          id: `r${r}-s${s}-e${e}-work`,
          type: "work",
          duration: 50,
          name: exercise.name,
          icon: exercise.icon,
          desc: exercise.desc,
          round: r,
          set: s,
          exerciseIndex: e + 1,
          totalRounds: roundsCount
        });

        // Determine what is up next
        let upNext = null;
        if (e < 2) {
          // Next exercise in the current set
          upNext = roundExercises[e + 1];
        } else if (s < 3) {
          // First exercise in the next set of the same round
          upNext = roundExercises[0];
        } else if (r < roundsCount) {
          // Transitioning to a new round (after round rest)
          upNext = { name: "Round Rest", icon: "BatteryCharging" };
        } else {
          // Transitioning to cooldown
          upNext = { name: "Cooldown", icon: "Heart" };
        }

        // 2. Rest interval (10 seconds)
        queue.push({
          id: `r${r}-s${s}-e${e}-rest`,
          type: "rest",
          duration: 10,
          name: "Rest",
          icon: "Coffee",
          desc: "Catch your breath & prepare",
          round: r,
          set: s,
          exerciseIndex: e + 1,
          totalRounds: roundsCount,
          upNext: upNext
        });
      }
    }

    // Between rounds, we have a 1-minute rest
    if (r < roundsCount) {
      const nextRoundExercises = EXERCISE_POOL[r + 1];
      queue.push({
        id: `r${r}-roundrest`,
        type: "round_rest",
        duration: 60,
        name: "Round Rest",
        icon: "BatteryCharging",
        desc: "Prepare for the next round of exercises",
        round: r,
        set: 3,
        exerciseIndex: 3,
        totalRounds: roundsCount,
        upNext: nextRoundExercises[0]
      });
    }
  }

  // Cooldown & stretch at the end of the entire workout (1 minute)
  queue.push({
    id: "cooldown",
    type: "cooldown",
    duration: 60,
    name: "Cooldown & Stretch",
    icon: "Heart",
    desc: "Slow down your heart rate and stretch",
    round: roundsCount,
    set: 3,
    exerciseIndex: 3,
    totalRounds: roundsCount,
    upNext: null
  });

  return queue;
}
