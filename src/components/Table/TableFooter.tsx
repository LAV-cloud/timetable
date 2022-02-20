import styles from './Table.module.scss';
import { Group } from '../../types/Teacher';

interface TableFooterProps {
    groups: Group[]
}

export default function TableFooter(props: TableFooterProps) {
    return (
        <tfoot className={styles.footer}>
            <tr className={styles.footer__row}>
                <td className={styles.footer__item}>Итого</td>
                {props.groups.map((group: Group, i: number) => {
                    return <td key={i} className={styles.footer__item}>{group.totalHours}</td>
                })}
            </tr>
        </tfoot>
    )
}