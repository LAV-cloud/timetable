import styles from './Table.module.scss';

interface TableFooterProps {
    hours: number[][];
    cols: { id: number, name: string }[]
    rows: { id: number, name: string }[]
}

export default function TableFooter(props: TableFooterProps) {
    function sum2(hours: number[][]): number {
        var result: number = 0;
        props.rows.map((row: { id: number, name: string }, i: number) => {
            props.cols.map((col: { id: number, name: string }, i: number) => {
                result += hours[row.id][col.id];
                return col;
            })
            return row;
        })
        return result;
    }

    function sum(hours: number[][], i: number): number {
        var result: number = 0;
        props.rows.map((row: { id: number, name: string }, j: number) => {
            result += hours[row.id][i];
            return row;
        })
        return result;
    }

    return (
        <tfoot className={styles.footer}>
            <tr className={styles.footer__row}>
                <td className={styles.footer__item}>Итого</td>
                {props.cols.map((col: { id: number, name: string }, i: number) => {
                    return <td key={i} className={styles.footer__item}>{sum(props.hours, i)}</td>
                })}
                <td className={styles.footer__item}>{sum2(props.hours)}</td>
            </tr>
        </tfoot>
    )
}