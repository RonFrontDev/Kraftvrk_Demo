
export interface WodSection {
  title: string;
  details: string[];
  duration?: string; // e.g., "15 minutes", "AMRAP 20", "For Time"
  scalingOptions?: {
    beginner: string[];
    advanced: string[];
  };
}

export interface Wod {
  goal: string; // Overall goal or focus of the WOD
  sections: WodSection[];
  type: 'individual' | 'team' | 'competition';
}

export type ExerciseCategory = 'bootcamp' | 'crossfit' | 'weightlifting';

export interface Exercise {
  name: string;
  description: string;
  instructions: string[];
  equipment: string[];
  primaryMuscles: string[];
  categories: ExerciseCategory[];
}
