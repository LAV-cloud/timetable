import { store } from '../redux/store';
import { GroupType, ItemType } from '../types/ScheduleSubjectResponse';
import { Group, Lesson, Teacher, TeacherProps } from '../types/Teacher';
import { Week } from '../types/Week';
import { ResponseType } from '../types/ScheduleSubjectResponse';
import { fetchData } from './fetch';

const lessonTimeValue: number = 2;

export async function calculateTeacher(
  nowMonth: number,
  week: Week,
  teacher: Teacher,
  props: TeacherProps,
  lastId: number
) {
  const url = `schedule/subject/${week.year}/${week.id}?accountId=${teacher.id}`;
  const response: ResponseType = await fetchData(url);
  response.data.items.map((item: ItemType) => {
    if (week.days.filter((day) => day.day === item.day).length) {
      calculatePart(item, props, week.month);
    }
    return item;
  });
  if (week.id === lastId) {
    calculateTotalHoursForMonth(props, week.month);
  } else if (nowMonth !== week.month) {
    calculateTotalHoursForMonth(props, nowMonth);
    nowMonth = week.month;
  }
}

function calculatePart(
  item: ItemType,
  props: TeacherProps,
  month: number
): TeacherProps {
  const lessonId: number = props.lessons.findIndex(
    (lesson) => lesson.id === item.subject.id
  );
  if (!props.lessons.length || lessonId === -1) {
    const lesson = createLesson(item, month);
    props.lessons.push(lesson);
  } else {
    const groupId = props.lessons[lessonId].groups.findIndex(
      (group) => group.id === item.group.id
    );
    if (groupId === -1) {
      const group = createGroup(item.group, month);
      props.lessons[lessonId].groups.push(group);
    } else {
      props.lessons[lessonId].groups[groupId].hours[month] += lessonTimeValue;
      props.lessons[lessonId].groups[groupId].totalHours += lessonTimeValue;
    }
  }
  return props;
}

function calculateTotalHoursForMonth(props: TeacherProps, month: number) {
  props.lessons.map((lesson: Lesson) => {
    var sum: number = 0;
    lesson.groups.map((group: Group) => {
      sum += group.hours[month];
      return group;
    });
    lesson.totalHoursForMonth[month] = sum;
    return lesson;
  });
}

export function createTeacherProps(
  year: number,
  teacher: Teacher
): TeacherProps {
  const props: TeacherProps = {
    teacher,
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
    year,
    currentRowId: 0,
    currentTabId: 0,
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
