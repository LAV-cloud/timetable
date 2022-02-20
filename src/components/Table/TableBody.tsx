import styles from './Table.module.scss';
import TableItem from './TableItem';
import { Group } from '../../types/Teacher';

interface TableBodyProps {
    currentMonth: number,
    groups: Group[]
    year: number,
}

export default function TableBody(props: TableBodyProps) {
    // var months: string[] = [
    //     "January", "February", "March",
    //     "April", "May", "June",
    //     "July", "August", "September",
    //     "October", "November", "December"
    // ]
    var months: string[] = [
        "Январь", "Февраль", "Март",
        "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь",
        "Октябрь", "Ноябрь", "Декабрь"
    ]
    var date = new Date();

    return (
        <tbody className={styles.body}>
            {months.map((month: string, i: number) => {
                if (props.year === date.getUTCFullYear() && i <= date.getUTCMonth()) {
                    return (
                        <TableItem
                            currentMonth={props.currentMonth}
                            groups={props.groups}
                            key={i}
                            id={i}
                            month={month}
                        />
                    )
                }
                if (props.year !== date.getUTCFullYear()) {
                    return (
                        <TableItem
                            currentMonth={props.currentMonth}
                            groups={props.groups}
                            key={i}
                            id={i}
                            month={month}
                        />
                    )
                }
                return <></>
            })}
        </tbody>
    )
}