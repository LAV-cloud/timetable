import styles from './Space.module.scss';
import Export from '../Export/Export';
import ProgressBar from '../ProgressBar/ProgressBar';
import Table from '../Table/Table';
import { useEffect } from 'react';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import { useActions } from '../../redux/hooks/useActions';
import { NotificationType } from '../../types/Notification';

export default function Space() {
    const { teacher, props, loading, error } = useTypedSelector((state: RootState) => state.teacher);
    const { addNotification, setProps, generateTable } = useActions();

    useEffect(() => {
        if (props && !loading.toggle) generateTable(teacher!, props!.year);
    }, [props?.year])

    useEffect(() => {
        if (error) addNotification(NotificationType.error, error);
    }, [error])

    function nextYear() {
        if (!loading.toggle) {
            if (props?.year === new Date().getFullYear()) {
                addNotification(NotificationType.warning, "В будующее смотреть нельзя :(")
            } else {
                setProps(props!.year + 1);
            }
        }
    }

    function prevYear() {
        if (!loading.toggle) {
            if (props!.year === 2021) {
                addNotification(NotificationType.warning, "Меня тогда ещё не было")
            } else {
                setProps(props!.year - 1);
            }
        }
    }

    if (props) {
        return (
            <div className={styles.space}>
                <div className={styles.space__info}>
                    <h1 className={styles.space__title}>
                        {teacher!.secondName + " "}
                        {teacher!.firstName[0]}.
                        {teacher!.thirdName[0]}.
                    </h1>
                    <Export />
                </div>
                <div className={styles.space__year}>
                    <button onClick={() => prevYear()} className={styles.space__yearBtn}>{"<"}</button>
                    <p>{props.year}</p>
                    <button onClick={() => nextYear()} className={styles.space__yearBtn}>{">"}</button>
                </div>
                {loading.toggle ? (
                    <div className={styles.loader}>
                        <ProgressBar />
                    </div>
                ) : (
                    <Table />
                )}
            </div>
        )
    }

    return (
        <div className={styles.empty}>
            <p>Выберите кого-нибудь из списка</p>
        </div>
    )
}