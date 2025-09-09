import type { ReactNode } from 'react';

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

// FIX: Add definitions for WodLog, PersonalRecord, and User types used in authentication and dashboard features.
export interface WodLog {
  score: string;
  notes: string;
}

export interface PersonalRecord {
  weight: number;
  date: string;
}

export interface User {
  email: string;
  password: string; // In a real app, this should be a hashed password
  wods: {
    [date: string]: WodLog;
  };
  prs: {
    [exerciseId: string]: PersonalRecord;
  };
}
