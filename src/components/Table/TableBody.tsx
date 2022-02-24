import styles from './Table.module.scss';
import TableItem from './TableItem';
import { Lesson, TeacherProps } from '../../types/Teacher';

interface TableBodyProps {
    teacherProps: TeacherProps,
    lesson: Lesson,
}

export default function TableBody(props: TableBodyProps) {
    const date = new Date();

    return (
        <tbody className={styles.body}>
            {props.teacherProps.months.map((month: string, i: number) => {
                const nowYear = props.teacherProps.year === date.getFullYear() && i <= date.getMonth() - 9;
                const nextYear = props.teacherProps.year < date.getFullYear() && (i < 4 || i <= date.getMonth() + 4);
                if (nowYear || nextYear) {
                    return (
                        <TableItem
                            currentMonth={props.teacherProps.currentMonth}
                            groups={props.lesson.groups}
                            key={i}
                            id={i}
                            month={month}
                            totalHoursByMonth={props.lesson.totalHoursForMonth}
                        />
                    )
                }
            })}
        </tbody>
    )
}