import styles from './Table.module.scss';
import { Group } from '../../types/Teacher';

interface TableHeaderProps {
    groups: Group[]
}

export default function TableHeader(props: TableHeaderProps) {
    return (
        <thead className={styles.header}>
            <tr className={styles.header__row}>
                <th className={styles.header__item}>Месяц</th>
                {props.groups.map((group: Group, i: number) => {
                    return <th key={i} className={styles.header__item}>{group.print}</th>
                })}
                <th className={styles.header__item}>Всего</th>
            </tr>
        </thead>
    )
}