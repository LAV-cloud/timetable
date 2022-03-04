import React from 'react';
import styles from './Table.module.scss';
import TableItem from './TableItem';

interface RowType {
    id: number,
    name: string
}

interface TableBodyProps {
    rows: RowType[];
    year: number
    selectRowId: number
    cols: number[],
    hours: number[][],
}

export default function TableBody(props: TableBodyProps) {

    return (
        <tbody className={styles.body}>
            {props.rows.map((row: RowType, i: number) => {
                // const date = new Date();
                // const nowYear = props.year === date.getFullYear() && i <= date.getMonth() - 9;
                // const nextYear = props.year < date.getFullYear() && (i < 4 || i <= date.getMonth() + 5);
                // if (nowYear || nextYear) {
                return (
                    <TableItem
                        selectRowId={props.selectRowId}
                        key={i}
                        row={row}
                        cols={props.cols}
                        hours={props.hours[row.id]}
                    />
                )
                // }
                // <React.Fragment key={i} />
            })}
        </tbody>
    )
}