import { store } from '../redux/store';
import { Group, Lesson, TeacherProps } from '../types/Teacher';
import { fetchData } from './fetch';
import { LoaderActionType } from '../types/Loader';
import { createGroup, createLesson, createProps } from './createProps';
import { ItemType, Week, ResponseType, Day } from '../types/Week';

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
  year: number,
  id?: number,
  count?: number
): Promise<TeacherProps | undefined> => {
  const props: TeacherProps = createProps(year);
  // console.log(new Date(2022, 1, 0).getWeek());
  var weeks: Week[] = getWeeks(props.year);
  // var weeks: Week[] = [
  // {
  //   id: 53,
  //   days: [
  //     { id: 26, day: 0 },
  //     { id: 27, day: 1 },
  //     { id: 28, day: 2 },
  //     { id: 29, day: 3 },
  //     { id: 30, day: 4 },
  //     { id: 31, day: 5 },
  //   ],
  //   month: 3,
  //   year: 2021,
  // },
  // {
  //   id: 1,
  //   days: [{ id: 1, day: 6 }],
  //   month: 4,
  //   year: 2022,
  // },
  // {
  //   id: 2,
  //   days: [
  //     { id: 2, day: 0 },
  //     { id: 3, day: 1 },
  //     { id: 4, day: 2 },
  //     { id: 5, day: 3 },
  //     { id: 6, day: 4 },
  //     { id: 7, day: 5 },
  //     { id: 8, day: 6 },
  //   ],
  //   month: 4,
  //   year: 2022,
  // },
  // {
  //   id: 3,
  //   days: [
  //     { id: 9, day: 0 },
  //     { id: 10, day: 1 },
  //     { id: 11, day: 2 },
  //     { id: 12, day: 3 },
  //     { id: 13, day: 4 },
  //     { id: 14, day: 5 },
  //     { id: 15, day: 6 },
  //   ],
  //   month: 4,
  //   year: 2022,
  // },
  // {
  //   id: 4,
  //   days: [
  //     { id: 16, day: 0 },
  //     { id: 17, day: 1 },
  //     { id: 18, day: 2 },
  //     { id: 19, day: 3 },
  //     { id: 20, day: 4 },
  //     { id: 21, day: 5 },
  //     { id: 22, day: 6 },
  //   ],
  //   month: 4,
  //   year: 2022,
  // },
  // {
  //   id: 5,
  //   days: [
  //     { id: 23, day: 0 },
  //     { id: 24, day: 1 },
  //     { id: 25, day: 2 },
  //     { id: 26, day: 3 },
  //     { id: 27, day: 4 },
  //     { id: 28, day: 5 },
  //     { id: 29, day: 6 },
  //   ],
  //   month: 4,
  //   year: 2022,
  // },
  // ];
  var nowMonth: number = 0;
  var i = 0;
  for (let week of weeks) {
    if (!store.getState().loader.loading) return;
    const url = `schedule/subject/${week.year}/${week.id}?accountId=${teacherId}`;
    const response: ResponseType = await fetchData(url);
    response.data.items.map((item: ItemType) => {
      if (week.days.filter((day) => day.day === item.day).length) {
        calculatePart(item, props, week.month);
      }
      return item;
    });
    if (week.id === weeks[weeks.length - 1].id) {
      calculateTotalHoursForMonth(props, week.month);
    } else if (nowMonth !== week.month) {
      calculateTotalHoursForMonth(props, nowMonth);
      nowMonth = week.month;
    }
    if (id && count) printPart(i + 1, count);
    if (!id) printPart(i + 1, weeks.length);
    i++;
  }
  return props;
};

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
