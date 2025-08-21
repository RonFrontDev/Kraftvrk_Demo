
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
  type: 'individual' | 'team';
}
