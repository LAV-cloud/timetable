import styles from './Table.module.scss';
import { useActions } from '../../redux/hooks/useActions';
import { Group } from '../../types/Teacher';

interface TableItemProps {
    id: number,
    currentMonth: number,
    groups: Group[],
    month: string
    totalHoursByMonth: number[]
}

export default function TableItem(props: TableItemProps) {
    var { setProps } = useActions();

    return (
        <tr
            onClick={() => setProps(undefined, props.id, undefined)}
            className={
                props.id === props.currentMonth ?
                    [styles.body__row, styles.body__row_select].join(" ") :
                    styles.body__row
            }
        >
            <td className={styles.body__item}>{props.month}</td>
            {props.groups.map((group: Group, i: number) => {
                return <td key={i} className={styles.body__item}>{group.hours[props.id]}</td>
            })}
            <td className={styles.body__item}>{props.totalHoursByMonth[props.id]}</td>
        </tr>
    )
}