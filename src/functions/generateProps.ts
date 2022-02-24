import { store } from '../redux/store';
import { Group, Lesson, TeacherProps } from '../types/Teacher';
import { fetchData } from './fetch';
import { LoaderActionType } from '../types/Loader';
import { createGroup, createLesson, createProps } from './createProps';
import { ItemType, Week, ResponseType } from '../types/Week';

declare global {
  interface Date {
    getWeek(): number;
  }
}

// eslint-disable-next-line no-extend-native
Date.prototype.getWeek = function () {
  var dt: Date = new Date(this.getFullYear(), 0, 1);
  return Math.ceil(
    ((this.getTime() - dt.getTime()) / 86400000 + dt.getDay() + 1) / 7
  );
};

const lessonTimeValue: number = 2;

export const generateProps = async (
  teacherId: number,
  id: number = 0,
  count: number = 1
): Promise<TeacherProps | undefined> => {
  const props: TeacherProps = createProps();
  var weeks: Week[] = getWeeks(props.year);
  var nowMonth: number = 0;
  var i = 0;
  for (let week of weeks) {
    if (!store.getState().loader.loading) return;
    const url = `schedule/subject/${week.year}/${week.id}?accountId=${teacherId}`;
    const response: ResponseType = await fetchData(url);
    response.data.items.map((item: ItemType) => {
      calculatePart(item, props, week.month);
      return item;
    });
    if (week.id === weeks[weeks.length - 1].id) {
      calculateTotalHoursForMonth(props, week.month);
    } else if (nowMonth !== week.month) {
      calculateTotalHoursForMonth(props, nowMonth);
      nowMonth = week.month;
    }
    printPart(weeks.length * id + (i + 1), weeks.length * count);
    i++;
  }
  return props;
};

function getWeeks(year: number): Week[] {
  const weeks: Week[] = [];
  const date: Date = new Date();
  const months: { date: Date; id: number }[] = getMonths(year);
  var startDate: { date: Date; id: number } = {
    date: new Date(`1 Sep ${year}`),
    id: 0,
  };
  months.map((nextMonth: { date: Date; id: number }, i: number) => {
    for (
      let week = startDate.date.getWeek();
      week < nextMonth.date.getWeek();
      week++
    ) {
      if (
        year < date.getFullYear() ||
        (year === date.getFullYear() &&
          startDate.date.getMonth() <= date.getMonth())
      )
        weeks.push({ id: week, month: startDate.id, year });
    }
    startDate = nextMonth;
    if (i === 3) year++;
    return nextMonth;
  });

  return weeks;
}

function getMonths(year: number): { date: Date; id: number }[] {
  return [
    { date: new Date(`1 Oct ${year}`), id: 1 },
    { date: new Date(`1 Nov ${year}`), id: 2 },
    { date: new Date(`1 Dec ${year}`), id: 3 },
    { date: new Date(`31 Dec ${year}`), id: 3 },
    { date: new Date(`1 Jan ${year}`), id: 4 },
    { date: new Date(`1 Feb ${year}`), id: 5 },
    { date: new Date(`1 Mar ${year}`), id: 6 },
    { date: new Date(`1 Apr ${year}`), id: 7 },
    { date: new Date(`1 May ${year}`), id: 8 },
    { date: new Date(`1 Jun ${year}`), id: 9 },
    { date: new Date(`1 Jul ${year}`), id: 10 },
    { date: new Date(`1 Aug ${year}`), id: 11 },
    { date: new Date(`31 Aug ${year}`), id: 11 },
  ];
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

function printPart(id: number, count: number) {
  store.dispatch({
    type: LoaderActionType.partLoading,
    payload: {
      progress: Math.floor((id / count) * 100),
      text: `Успешно обработали данные! ${id}/${count}`,
    },
  });
}
