export interface Week {
  id: number;
  days: Day[];
  month: number;
  year: number;
}

export interface Day {
  id: number;
  day: number;
}
