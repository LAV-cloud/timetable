import { useActions } from '../../redux/hooks/useActions';
import { Group } from '../../types/Group';
import { Teacher } from '../../types/Teacher';
import styles from './List.module.scss';

interface ItemProps {
    selectId: number,
    text: string,
    item: Teacher | Group,
}

export default function ListItem(props: ItemProps) {
    const { startLoading, generateTable } = useActions();

    return (
        <button
            onClick={() => {
                startLoading();
                generateTable(props.item)
            }}
            className={props.selectId === props.item.id ?
                [styles.item, styles.item_select].join(" ") : styles.item}
        >
            {props.text}
        </button>
    )
}