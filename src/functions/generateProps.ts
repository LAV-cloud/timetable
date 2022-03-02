import { store } from '../redux/store';
import { LoaderActionType } from '../types/Loader';
import { Week, Day } from '../types/Week';
import { Group, GroupProps } from '../types/Group';
import { Teacher, TeacherProps } from '../types/Teacher';
import { DataType } from '../types/Data';
import { calculateTeacher, createTeacherProps } from './calculateTeacher';
import { calculateGroup, createGroupProps } from './calculateGroup';

export async function generateProps(
  object: Group | Teacher,
  year: number
): Promise<TeacherProps | GroupProps | undefined> {
  var type = store.getState().data.dataType;
  try {
    switch (type) {
      case DataType.teachers:
        return await generateTeacherProps(object as Teacher, year);
      case DataType.groups:
        return await generateGroupProps(object as Group, year);
    }
  } catch (e) {
    console.error(e);
  }
}

async function generateTeacherProps(teacher: Teacher, year: number) {
  console.log('TeacherId', teacher.id);
  const weeks: Week[] = getWeeks(year);
  const props = createTeacherProps(year, teacher);
  var nowMonth: number = 0;
  var i = 0;
  for (let week of weeks) {
    if (!store.getState().loader.loading) return;
    await calculateTeacher(
      nowMonth,
      week,
      teacher,
      props,
      weeks[weeks.length - 1].id
    );
    printPart(i + 1, weeks.length);
    i++;
  }
  return props;
}

async function generateGroupProps(group: Group, year: number) {
  console.log('GroupId', group.id);
  const weeks: Week[] = getWeeks(year);
  const props = createGroupProps(year, group);
  var i = 0;
  for (let i = 0; i < 12; i++) {
    props.lessons.push([]);
    props.days.push([]);
  }
  for (let week of weeks) {
    for (let i = 0; i < week.days.length; i++) {
      props.days[week.month].push(week.days[i].id);
    }
  }
  for (let week of weeks) {
    if (!store.getState().loader.loading) return;
    await calculateGroup(week, group, props);
    printPart(i + 1, weeks.length);
    i++;
  }
  return props;
}

function getWeeks(year: number): Week[] {
  const weeks: Week[] = [];
  for (let i = 0, month = 8; i < 12; i++) {
    const lastMonthDay = new Date(year, month + 1, 0).getDate();
    for (
      let day: number = 1, week: number = 0, days: Day[] = [];
      day <= lastMonthDay;
      day++
    ) {
      if (week !== new Date(year, month, day).getWeek()) {
        if (week !== 0) weeks.push({ id: week - 1, days, month: i, year });
        days = [];
        week = new Date(year, month, day).getWeek();
      }
      days.push({ id: day, day: new Date(year, month, day).getDay() });
      if (day === lastMonthDay && days.length)
        weeks.push({ id: week - 1, days, month: i, year });
    }
    month++;
    if (i === 3) {
      year++;
      month = 0;
    }
  }
  return weeks;
}

function printPart(id: number, count: number) {
  store.dispatch({
    type: LoaderActionType.partLoading,
    payload: {
      progress: Math.floor((id / count) * 100),
      text: `Успешно обработали данные! ${id}/${count}`,
    },
  });
}
