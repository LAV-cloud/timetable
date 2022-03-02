import TableLesson from './TableLesson';
import styles from './Table.module.scss';

interface TableLessonsPropsType {
    tabs: { id: number, name: string }[]
    selectTabId: number
}

export default function TableLessons(props: TableLessonsPropsType) {

    return (
        <div className={styles.timetable__lessons}>
            {props.tabs.map((tab: { id: number, name: string }, i: number) => {
                return <TableLesson selectTabId={props.selectTabId} tab={tab} key={i} />
            })}
        </div>
    )
}