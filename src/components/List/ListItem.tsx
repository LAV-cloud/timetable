import { useActions } from '../../redux/hooks/useActions';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers';
import { Teacher } from '../../types/Teacher';
import styles from './List.module.scss';

interface ItemProps {
    teacher: Teacher,
}

export default function ListItem(props: ItemProps) {
    const teacherState = useTypedSelector((state: RootState) => state.teacher);
    const { startLoading, generateTable } = useActions();

    return (
        <button
            onClick={() => {
                startLoading();
                generateTable(props.teacher)
            }}
            className={teacherState.teacher?.id === props.teacher.id ?
                [styles.item, styles.item_select].join(" ") : styles.item}
        >
            {props.teacher.fullName}
        </button>
    )
}