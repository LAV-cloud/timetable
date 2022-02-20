import {
  Teacher,
  TeacherAction,
  TeacherActionType,
  TeacherProps,
} from '../../../types/Teacher';
import { Dispatch } from 'redux';
import { fetchData } from '../../../functions/fetch';
import { store } from '..';

interface MetaType {
  count: number;
  breakTime: number;
  lastUpdateTime: number;
}

interface ResponseType {
  status: boolean;
  data: {
    meta: MetaType;
    items: ItemType[];
  };
}

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

export const setProps = (
  year?: number,
  currentMonth?: number,
  currentLesson?: number
) => {
  return (dispatch: Dispatch<TeacherAction>) => {
    const { props }: { props: TeacherProps | null } = store.getState().teacher;
    dispatch({
      type: TeacherActionType.setProps,
      payload: {
        ...props!,
        year: year ?? props!.year,
        currentLesson: currentLesson ?? props!.currentLesson,
        currentMonth: currentMonth ?? props!.currentMonth,
      },
    });
  };
};

export const generateTable = (
  teacher: Teacher,
  year: number = new Date().getUTCFullYear(),
  lessonTimeValue: number = 2
) => {
  return async (dispatch: Dispatch<TeacherAction>) => {
    startGenerate(dispatch, teacher);
    try {
      console.log('TeacherId: ', teacher.id);
      var props: TeacherProps = createProps(year);
      successCreateProps(dispatch, props);
      generateData(props, lessonTimeValue, dispatch, teacher).then(() => {
        finishGenerate(dispatch, props);
      });
    } catch (e) {
      dispatch({
        type: TeacherActionType.failGenerate,
        payload: 'Произошла ошибка при загрузке данных учителя',
      });
      console.error(e);
    }
  };
};

async function generateData(
  props: TeacherProps,
  lessonTimeValue: number,
  dispatch: Dispatch<TeacherAction>,
  teacher?: Teacher
) {
  const startMonths: Date[] = getMonths(props.year);
  const maxWeek = getMaxWeek(props.year, startMonths[startMonths.length - 1]);
  for (let week = 1, month = 0; week <= maxWeek; week++) {
    const url = `schedule/subject/${props.year}/${week}${
      teacher ? '?accountId=' + teacher.id : ''
    }`;
    const response: ResponseType = await fetchData(url);
    response.data.items.map((item: ItemType) => {
      month = addMonth(week, item, month, startMonths[month]);
      calculatePart(item, props, lessonTimeValue, month);
      return item;
    });
    printPart(dispatch, week, maxWeek);
  }
}

function calculatePart(
  item: ItemType,
  props: TeacherProps,
  lessonTimeValue: number,
  month: number
): TeacherProps {
  const lessonId: number = props.lessons.findIndex(
    (lesson) => lesson.id === item.subject.id
  );
  if (!props.lessons.length || lessonId === -1) {
    const lesson = createLesson(item, lessonTimeValue, props.year);
    props.lessons.push(lesson);
  } else {
    const groupId = props.lessons[lessonId].groups.findIndex(
      (group) => group.id === item.group.id
    );
    if (groupId === -1) {
      const group = createGroup(item.group, lessonTimeValue, props.year);
      props.lessons[lessonId].groups.push(group);
    } else {
      props.lessons[lessonId].groups[groupId].hours[month] += lessonTimeValue;
      props.lessons[lessonId].groups[groupId].totalHours += lessonTimeValue;
    }
  }
  return props;
}

function printPart(
  dispatch: Dispatch<TeacherAction>,
  week: number,
  maxWeek: number
) {
  dispatch({
    type: TeacherActionType.setLoadingState,
    payload: {
      toggle: true,
      progress: 10 + Math.floor((week / maxWeek) * 90),
      text: `Success create lesson and groups ${week}/${maxWeek}`,
    },
  });
}

function getMonths(year: number): Date[] {
  return [
    new Date(`1 Feb ${year}`),
    new Date(`1 Mar ${year}`),
    new Date(`1 Apr ${year}`),
    new Date(`1 May ${year}`),
    new Date(`1 Jun ${year}`),
    new Date(`1 Jul ${year}`),
    new Date(`1 Aug ${year}`),
    new Date(`1 Sep ${year}`),
    new Date(`1 Oct ${year}`),
    new Date(`1 Nov ${year}`),
    new Date(`1 Dec ${year}`),
    new Date(`31 Dec ${year}`),
  ];
}

function addMonth(
  week: number,
  item: ItemType,
  month: number,
  nextMonth: Date
) {
  if (week === nextMonth.getWeek() && item.day >= nextMonth.getDay()) {
    month++;
  } else if (week >= nextMonth.getWeek()) {
    month++;
  }
  return month;
}

function startGenerate(dispatch: Dispatch<TeacherAction>, teacher: Teacher) {
  dispatch({
    type: TeacherActionType.startGenerate,
    payload: teacher,
  });
  dispatch({
    type: TeacherActionType.setLoadingState,
    payload: { toggle: true, progress: 0, text: 'Create props' },
  });
}

function finishGenerate(
  dispatch: Dispatch<TeacherAction>,
  props: TeacherProps
) {
  dispatch({
    type: TeacherActionType.setLoadingState,
    payload: {
      toggle: true,
      progress: 100,
      text: 'Complete',
    },
  });
  setTimeout(() => {
    dispatch({
      type: TeacherActionType.successGenerate,
      payload: props,
    });
  }, 500);
}

function getMaxWeek(year: number, lastMonth: Date) {
  const date = new Date();
  return year === date.getFullYear() ? date.getWeek() : lastMonth.getWeek();
}

function successCreateProps(
  dispatch: Dispatch<TeacherAction>,
  props: TeacherProps
) {
  dispatch({
    type: TeacherActionType.setProps,
    payload: props,
  });
  dispatch({
    type: TeacherActionType.setLoadingState,
    payload: { toggle: true, progress: 10, text: 'Success create props' },
  });
}

function createProps(year: number): TeacherProps {
  const date = new Date();
  const props: TeacherProps = {
    lessons: [],
    year,
    currentMonth: year === date.getFullYear() ? date.getUTCMonth() : 0,
    currentLesson: 0,
  };
  return props;
}

function createLesson(item: ItemType, lessonTimeValue: number, year: number) {
  const group = createGroup(item.group, lessonTimeValue, year);
  const lesson = {
    id: item.subject.id,
    name: item.subject.name,
    groups: [group],
  };
  return lesson;
}

function createGroup(item: GroupType, lessonTimeValue: number, year: number) {
  const group = {
    id: item.id,
    name: item.name,
    print: item.print,
    hours: createHours(lessonTimeValue, year),
    totalHours: lessonTimeValue,
  };
  return group;
}

function createHours(lessonTimeValue: number, year: number) {
  var hours: number[] = [],
    date: Date = new Date(),
    month: number = 0;
  if (year === date.getUTCFullYear()) {
    month = date.getUTCMonth() + 1;
  } else if (year < date.getUTCFullYear()) {
    month = 12;
  }
  for (let i = 0; i < month; i++) {
    if (i === 0) hours[i] = lessonTimeValue;
    if (i !== 0) hours[i] = 0;
  }
  return hours;
}
