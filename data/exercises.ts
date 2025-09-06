
import type { ExerciseCategory } from '../types';

export interface StaticExercise {
  id: string;
  categories: ExerciseCategory[];
}

export const staticExercises: StaticExercise[] = [
  // Barbell
  { id: 'back_squat', categories: ['weightlifting'] },
  { id: 'front_squat', categories: ['weightlifting', 'crossfit'] },
  { id: 'overhead_squat', categories: ['weightlifting', 'crossfit'] },
  { id: 'deadlift', categories: ['weightlifting'] },
  { id: 'sumo_deadlift_high_pull', categories: ['crossfit'] },
  { id: 'bench_press', categories: ['weightlifting'] },
  { id: 'shoulder_press', categories: ['weightlifting'] },
  { id: 'push_press', categories: ['weightlifting', 'crossfit'] },
  { id: 'push_jerk', categories: ['weightlifting', 'crossfit'] },
  { id: 'snatch', categories: ['weightlifting', 'crossfit'] },
  { id: 'clean_and_jerk', categories: ['weightlifting', 'crossfit'] },

  // Dumbbell
  { id: 'dumbbell_snatch', categories: ['crossfit'] },
  { id: 'dumbbell_clean', categories: ['crossfit'] },
  { id: 'dumbbell_thruster', categories: ['crossfit'] },
  { id: 'dumbbell_bench_press', categories: ['bootcamp'] },
  { id: 'renegade_row', categories: ['bootcamp', 'crossfit'] },
  { id: 'dumbbell_lunge', categories: ['bootcamp'] },

  // Kettlebell
  { id: 'kettlebell_swing', categories: ['crossfit'] },
  { id: 'goblet_squat', categories: ['bootcamp'] },
  { id: 'turkish_get_up', categories: ['crossfit'] },
  { id: 'kettlebell_snatch', categories: ['crossfit'] },

  // Gymnastics
  { id: 'pull_up', categories: ['crossfit'] },
  { id: 'push_up', categories: ['bootcamp', 'crossfit'] },
  { id: 'sit_up', categories: ['bootcamp'] },
  { id: 'air_squat', categories: ['bootcamp', 'crossfit'] },
  { id: 'toes_to_bar', categories: ['crossfit'] },
  { id: 'handstand_push_up', categories: ['crossfit'] },
  { id: 'muscle_up', categories: ['crossfit'] },
  { id: 'rope_climb', categories: ['crossfit'] },

  // Cardio
  { id: 'running', categories: ['bootcamp'] },
  { id: 'rowing', categories: ['crossfit', 'bootcamp'] },
  { id: 'double_unders', categories: ['crossfit'] },
  { id: 'burpees', categories: ['bootcamp', 'crossfit'] },
  { id: 'box_jumps', categories: ['crossfit'] },
];
