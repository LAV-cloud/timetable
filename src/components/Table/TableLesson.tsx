import styles from './Table.module.scss';
import { useActions } from '../../redux/hooks/useActions';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers';
import { Lesson } from '../../types/Teacher';

interface TableLessonProps {
    lesson: Lesson,
    id: number,
}

export default function TableLesson(props: TableLessonProps) {
    const teacherState = useTypedSelector((state: RootState) => state.teacher);
    const { setProps } = useActions()

    return (
        <button
            onClick={() => setProps(undefined, undefined, props.id)}
            className={
                teacherState.props!.lessons[teacherState.props!.currentLesson].id === props.lesson.id ?
                    [styles.timetable__lesson, styles.timetable__lesson_select].join(" ") :
                    styles.timetable__lesson
            }>
            {props.lesson.name}
        </button>
    )
}