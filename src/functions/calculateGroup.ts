import { Week, Day } from '../types/Week';
import { Group, GroupProps, Lesson } from '../types/Group';
import { fetchData } from './fetch';
import { ItemType } from '../types/ScheduleSubjectResponse';
import { ResponseType } from '../types/ScheduleSubjectResponse';
import { store } from '../redux/store';
import { LoaderActionType } from '../types/Loader';

const lessonTimeValue: number = 2;

export async function calculateGroup(
    week: Week,
    group: Group,
    props: GroupProps
) {
    try {
        const url = `schedule/subject/${week.year}/${week.id}?groupId=${group.id}`;
        const response: ResponseType = await fetchData(url);
        response.data.items.map((item: ItemType) => {
            const correctDay = week.days.filter((day) => day.day === item.day);
            if (correctDay.length > 0) {
                calculatePart(
                    item,
                    props,
                    week.month,
                    props.days[week.month],
                    correctDay[0].id
                );
            }
            return item;
        });
    } catch (e) {
        store.dispatch({
            type: LoaderActionType.errorLoading,
            payload: `Произошла ошибка при загрузке недели weekId: ${week.id}`,
        });
        throw new Error();
    }
}

function calculatePart(
    item: ItemType,
    props: GroupProps,
    month: number,
    days: Day[],
    day: number
) {
    const lessonId: number = props.lessons[month].findIndex(
        (lesson) =>
            lesson.subject.id === item.subject.id &&
            lesson.subgroup === item.subgroup?.name
    );

    if (lessonId === -1) {
        const lesson = createLesson(item);
        days.map((d: Day, i: number) => {
            lesson.hours[i] = 0;
            if (day - 1 === i) lesson.hours[i] = lessonTimeValue;
            return d;
        });
        props.lessons[month].push(lesson);
    } else if (
        item.subgroup !== undefined &&
        props.lessons[month][lessonId].subgroup !== item.subgroup.name
    ) {
        const lesson = createLesson(item);
        days.map((d: Day, i: number) => {
            lesson.hours[i] = 0;
            if (day - 1 === i) lesson.hours[i] = lessonTimeValue;
            return d;
        });
        props.lessons[month].push(lesson);
    } else {
        props.lessons[month][lessonId].hours[day - 1] += lessonTimeValue;
    }
}

export function createGroupProps(year: number, group: Group): GroupProps {
    const props: GroupProps = {
        group,
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
        days: [],
        year,
        currentRowId: 0,
        currentTabId: 0,
    };
    return props;
}

function createLesson(item: ItemType): Lesson {
    return {
        id: item.id,
        teacher: item.teacher,
        subject: item.subject,
        hours: [],
        subgroup: item.subgroup?.name,
    };
}
