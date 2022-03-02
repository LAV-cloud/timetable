import styles from './Table.module.scss';
import { useActions } from '../../redux/hooks/useActions';
interface TableLessonProps {
    selectTabId: number,
    tab: { id: number, name: string },
}

export default function TableLesson(props: TableLessonProps) {
    const { setProps } = useActions()

    return (
        <button
            onClick={() => setProps(undefined, undefined, props.tab.id)}
            className={
                props.selectTabId === props.tab.id ?
                    [styles.timetable__lesson, styles.timetable__lesson_select].join(" ") :
                    styles.timetable__lesson
            }
        >
            {props.tab.name}
        </button >
    )
}