
export interface WodSection {
  title: string;
  details: string[];
}

export interface Wod {
  warmup: WodSection;
  strength: WodSection;
  metcon: WodSection;
}
