import styles from './Table.module.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import TableLessons from './TableLessons';

interface TableTabType {
    id: number,
    name: string,
}

interface TableRowType {
    id: number
    name: string
}

interface TableColType {
    id: number,
    name: string,
}

interface TablePropsType {
    tabs: TableTabType[]
    rows: TableRowType[]
    cols: TableColType[]
    year: number,
    selectTabId: number
    selectRowId: number,
    hours: number[][]
}

export default function Table(props: TablePropsType) {
    if (props) {
        return (
            <div className={styles.timetable__body}>
                <TableLessons selectTabId={props.selectTabId} tabs={props.tabs} />
                <table className={styles.timetable__table} cellPadding={0} cellSpacing={5}>
                    <TableHeader cols={props.cols} />
                    <TableBody
                        hours={props.hours}
                        cols={props.cols.map((col => col.id))} selectRowId={props.selectRowId}
                        year={props.year}
                        rows={props.rows}
                    />
                    <TableFooter hours={props.hours} cols={props.cols} rows={props.rows} />
                </table>
            </div>
        )
    }

    return <div className={styles.empty}>Ничего не найдено</div>
}