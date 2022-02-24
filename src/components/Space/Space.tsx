import styles from './Space.module.scss';
import Export from '../Export/Export';
import Table from '../Table/Table';
import { useEffect } from 'react';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import { useActions } from '../../redux/hooks/useActions';
import { NotificationType } from '../../types/Notification';

export default function Space() {
    const { teacher, props, loading, error } = useTypedSelector((state: RootState) => state.teacher);
    const { addNotification, setProps, generateTable } = useActions();

    // useEffect(() => {
    //     if (props && !loading.toggle) generateTable(teacher!);
    // }, [props?.year])

    useEffect(() => {
        if (error) addNotification(NotificationType.error, error);
    }, [error])

    function nextYear() {
        if (!loading) {
            const date = new Date();
            if ((props!.year + 1) === date.getFullYear() && date.getMonth() < new Date(`1 Sep ${date.getFullYear()}`).getMonth()) {
                addNotification(NotificationType.warning, "В будующее смотреть нельзя :(")
            } else {
                setProps(props!.year + 1);
            }
        }
    }

    function prevYear() {
        if (!loading) {
            if (props!.year === 2021) {
                addNotification(NotificationType.warning, "API: Меня тогда ещё не было")
            } else {
                setProps(props!.year - 1);
            }
        }
    }

    if (teacher) {
        return (
            <div className={styles.space}>
                <div className={styles.space__info}>
                    <h1 className={styles.space__title}>
                        {teacher!.fullName}
                    </h1>
                    <Export />
                </div>
                {props && (
                    <div className={styles.space__year}>
                        <button onClick={() => prevYear()} className={styles.space__yearBtn}>{"<"}</button>
                        <p>{props.year} - {props.year + 1}</p>
                        <button onClick={() => nextYear()} className={styles.space__yearBtn}>{">"}</button>
                    </div>
                )}
                {!loading && <Table />}
                <p className={styles.space__created}>Created by Бережной Роман для НКЭиВТ</p>
            </div>
        )
    }

    return (
        <div className={styles.empty}>
            <p>Выберите кого-нибудь из списка</p>
            <p className={styles.space__created}>Created by Бережной Роман для НКЭиВТ</p>
        </div>
    )
}