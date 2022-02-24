import styles from './Table.module.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableLessons from './TableLessons';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';

export default function Table() {
    const { props } = useTypedSelector((state: RootState) => state.teacher);
    const { lessons, currentLesson } = props!;

    if (lessons.length) {
        return (
            <div className={styles.timetable__body}>
                <TableLessons />
                <table className={styles.timetable__table} cellPadding={0} cellSpacing={5}>
                    <TableHeader groups={lessons[currentLesson].groups} />
                    <TableBody teacherProps={props!} lesson={lessons[currentLesson]} />
                    <TableFooter groups={lessons[currentLesson].groups} />
                </table>
            </div>
        )
    }
    return <div className={styles.empty}>Ничего не найдено</div>
}