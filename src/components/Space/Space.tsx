import styles from './Space.module.scss';
import { useEffect } from 'react';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import { useActions } from '../../redux/hooks/useActions';
import TeacherSpace from './TeacherSpace';
import GroupSpace from './GroupSpace';
import { DataType } from '../../types/Config';

export default function Space() {
    const { props, error } = useTypedSelector((state: RootState) => state.item);
    const { dataType } = useTypedSelector((state: RootState) => state.config);
    const { addError } = useActions();

    useEffect(() => {
        if (error) addError(error);
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