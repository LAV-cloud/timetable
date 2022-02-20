import TableLesson from './TableLesson';
import styles from './Table.module.scss';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers';
import { Lesson } from '../../types/Teacher';

export default function TableLessons() {
    const { props } = useTypedSelector((state: RootState) => state.teacher);
    const { lessons } = props!;

    return (
        <div className={styles.timetable__lessons}>
            {lessons.map((lesson: Lesson, i: number) => {
                return <TableLesson id={i} lesson={lesson} key={i} />
            })}
        </div>
    )
}