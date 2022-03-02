import { ItemProps } from './Item';
export interface Teacher {
  id: number;
  firstName: string;
  secondName: string;
  thirdName: string;
  fullName: string;
}

export interface TeacherProps extends ItemProps {
  teacher: Teacher;
  lessons: Lesson[];
}

export interface Group {
  id: number;
  name: number;
  print: string;
  hours: number[];
  totalHours: number;
}

export interface Lesson {
  id: number;
  name: string;
  groups: Group[];
  totalHoursForMonth: number[];
}
