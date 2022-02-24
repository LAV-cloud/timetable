import { Teacher, TeacherProps } from '../types/Teacher';

interface SubjectType {
  id: number;
  name: string;
}

interface ClassroomType {
  id: number;
  floor: number;
  name: string;
}

interface GroupType {
  id: number;
  name: number;
  print: string;
}

interface ItemType {
  id: number;
  day: number;
  sort: number;
  time: {
    start: number;
    length: number;
  };
  teacher: Teacher;
  subject: SubjectType;
  classroom: ClassroomType;
  group: GroupType;
}

const lessonTimeValue: number = 2;

export function createProps(): TeacherProps {
  const date = new Date();
  const props: TeacherProps = {
    months: [
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
    ],
    lessons: [],
    year: date.getMonth() >= 9 ? date.getFullYear() : date.getFullYear() - 1,
    currentMonth: 0,
    currentLesson: 0,
  };
  return props;
}

export function createLesson(item: ItemType, month: number) {
  const group = createGroup(item.group, month);
  const lesson = {
    id: item.subject.id,
    name: item.subject.name,
    groups: [group],
    totalHoursForMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };
  return lesson;
}

export function createGroup(item: GroupType, month: number) {
  const group = {
    id: item.id,
    name: item.name,
    print: item.print,
    hours: createHours(month),
    totalHours: lessonTimeValue,
  };
  return group;
}

function createHours(month: number) {
  var hours: number[] = [],
    months: number = 12;
  for (let i = 0; i < months; i++) {
    if (i === month) {
      hours.push(lessonTimeValue);
    } else {
      hours.push(0);
    }
  }
  return hours;
}
