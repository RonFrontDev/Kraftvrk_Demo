import type { ExerciseCategory } from '../types';

export interface StaticExercise {
  id: string;
  category: ExerciseCategory;
}

export const staticExercises: StaticExercise[] = [
  // Barbell
  { id: 'back_squat', category: 'barbell' },
  { id: 'front_squat', category: 'barbell' },
  { id: 'overhead_squat', category: 'barbell' },
  { id: 'deadlift', category: 'barbell' },
  { id: 'sumo_deadlift_high_pull', category: 'barbell' },
  { id: 'bench_press', category: 'barbell' },
  { id: 'shoulder_press', category: 'barbell' },
  { id: 'push_press', category: 'barbell' },
  { id: 'push_jerk', category: 'barbell' },
  { id: 'snatch', category: 'barbell' },
  { id: 'clean_and_jerk', category: 'barbell' },

  // Dumbbell
  { id: 'dumbbell_snatch', category: 'dumbbell' },
  { id: 'dumbbell_clean', category: 'dumbbell' },
  { id: 'dumbbell_thruster', category: 'dumbbell' },
  { id: 'dumbbell_bench_press', category: 'dumbbell' },
  { id: 'renegade_row', category: 'dumbbell' },
  { id: 'dumbbell_lunge', category: 'dumbbell' },

  // Kettlebell
  { id: 'kettlebell_swing', category: 'kettlebell' },
  { id: 'goblet_squat', category: 'kettlebell' },
  { id: 'turkish_get_up', category: 'kettlebell' },
  { id: 'kettlebell_snatch', category: 'kettlebell' },

  // Gymnastics
  { id: 'pull_up', category: 'gymnastics' },
  { id: 'push_up', category: 'gymnastics' },
  { id: 'sit_up', category: 'gymnastics' },
  { id: 'air_squat', category: 'gymnastics' },
  { id: 'toes_to_bar', category: 'gymnastics' },
  { id: 'handstand_push_up', category: 'gymnastics' },
  { id: 'muscle_up', category: 'gymnastics' },
  { id: 'rope_climb', category: 'gymnastics' },

  // Cardio
  { id: 'running', category: 'cardio' },
  { id: 'rowing', category: 'cardio' },
  { id: 'double_unders', category: 'cardio' },
  { id: 'burpees', category: 'cardio' },
  { id: 'box_jumps', category: 'cardio' },
];
