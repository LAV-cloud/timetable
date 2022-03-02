import styles from './Space.module.scss';
import { useEffect } from 'react';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import { useActions } from '../../redux/hooks/useActions';
import { NotificationType } from '../../types/Notification';
import { DataType } from '../../types/Data';
import TeacherSpace from './TeacherSpace';
import GroupSpace from './GroupSpace';

export default function Space() {
    const { props, error } = useTypedSelector((state: RootState) => state.item);
    const { dataType } = useTypedSelector((state: RootState) => state.data);
    const { addNotification } = useActions();

    // useEffect(() => {
    //     if (props && !loading) generateTable(teacher!);
    // }, [props?.year])

    useEffect(() => {
        if (error) addNotification(NotificationType.error, error);
    }, [error])

    if (props) {
        switch (dataType) {
            case DataType.teachers:
                return <TeacherSpace />
            case DataType.groups:
                return <GroupSpace />
        }
    }

    return (
        <div className={styles.empty}>
            <p>Выберите кого-нибудь из списка</p>
            <p className={styles.space__created}>Created by Бережной Роман для НКЭиВТ</p>
        </div>
    )
}