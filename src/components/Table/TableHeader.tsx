import styles from './Table.module.scss';

interface TableHeaderProps {
    cols: { id: number, name: string }[]
}

export default function TableHeader(props: TableHeaderProps) {
    return (
        <thead className={styles.header}>
            <tr className={styles.header__row}>
                <th className={styles.header__item}>Месяц</th>
                {props.cols.map((tab: { id: number, name: string }, i: number) => {
                    return <th key={i} className={styles.header__item}>{tab.name}</th>
                })}
                <th className={styles.header__item}>Всего</th>
            </tr>
        </thead>
    )
}