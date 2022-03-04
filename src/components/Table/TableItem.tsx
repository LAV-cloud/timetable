import styles from './Table.module.scss';
import { useActions } from '../../redux/hooks/useActions';

interface TableItemProps {
    selectRowId: number,
    row: { id: number, name: string },
    hours: number[],
    cols: number[]
}

export default function TableItem(props: TableItemProps) {
    var { setProps } = useActions();

    function sum(hours: number[]): number {
        var result: number = 0;
        hours.map((hour: number) => {
            result += hour;
            return hour;
        })
        return result;
    }

    return (
        <tr
            onClick={() => setProps(undefined, props.row.id, undefined)}
            className={
                props.row.id === props.selectRowId ?
                    [styles.body__row, styles.body__row_select].join(" ") :
                    styles.body__row
            }
        >
            <td className={styles.body__item}>{props.row.name}</td>
            {props.cols.map((col: number, i: number) => {
                const res: number = props.hours[col];
                return <td key={i} className={res === 0 ? [styles.body__item, styles.body__item_empty].join(" ") : styles.body__item}>{res === 0 ? "" : res}</td>
            })}
            <td className={styles.body__item}>{sum(props.hours)}</td>
        </tr>
    )
}