export interface TeacherState {
  teacher: Teacher | null;
  props: TeacherProps | null;
  loading: boolean;
  error: null | string;
}

export enum TeacherActionType {
  successGenerate = 'SUCCESS_GENERATE',
  failGenerate = 'FAIL_GENERATE',
  startGenerate = 'START_GENERATE',
  setProps = 'SET_PROPS',
  removeTeacher = 'REMOVE_TEACHER',
}

interface SuccessGenerate {
  type: TeacherActionType.successGenerate;
  payload: TeacherProps;
}

interface RemoveTeacher {
  type: TeacherActionType.removeTeacher;
}

interface FailGenerate {
  type: TeacherActionType.failGenerate;
  payload: string;
}

interface StartGenerate {
  type: TeacherActionType.startGenerate;
  payload: Teacher;
}

interface SetProps {
  type: TeacherActionType.setProps;
  payload: TeacherProps;
}

export type TeacherAction =
  | StartGenerate
  | SuccessGenerate
  | FailGenerate
  | SetProps
  | RemoveTeacher;

export interface TeachersState {
  teachers: Teacher[];
  loading: boolean;
  error: null | string;
}

export enum TeachersActionType {
  fetchTeachers = 'FETCH_TEACHERS',
  successFetchTeachers = 'SUCCESS_FETCH_TEACHERS',
  failFetchTeachers = 'FAIL_FETCH_TEACHERS',
}

interface FetchTeachers {
  type: TeachersActionType.fetchTeachers;
}

interface SuccessFetchTeachers {
  type: TeachersActionType.successFetchTeachers;
  payload: Teacher[];
}

interface FailFetchTeachers {
  type: TeachersActionType.failFetchTeachers;
  payload: string;
}

export type TeachersAction =
  | FetchTeachers
  | SuccessFetchTeachers
  | FailFetchTeachers;

export interface Teacher {
  id: number;
  firstName: string;
  secondName: string;
  thirdName: string;
  fullName: string;
}

export interface TeacherProps {
  months: string[];
  lessons: Lesson[];
  year: number;
  currentMonth: number;
  currentLesson: number;
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
