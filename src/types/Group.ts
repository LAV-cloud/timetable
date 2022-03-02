import { Teacher } from './Teacher';
import { ItemProps } from './Item';

export interface Group {
  id: number;
  name: number;
  educationLevel: string;
  course: number;
  startYear: number;
  commercial: boolean;
  specialtyId: number;
  print: string;
}

export interface GroupProps extends ItemProps {
  group: Group;
  lessons: Lesson[][];
  days: number[][];
}

export interface Lesson {
  id: number;
  teacher: Teacher;
  subject: Subject;
  hours: number[];
}

export interface Subject {
  id: number;
  name: string;
}
