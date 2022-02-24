import styles from './List.module.scss'
import Search from '../Search/Search'
import ListItem from './ListItem';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import { Teacher, TeacherProps } from '../../types/Teacher';
import { CgArrowRight } from 'react-icons/cg';
import { generateProps } from '../../functions/generateProps';
import { useActions } from '../../redux/hooks/useActions';
import { exportData } from '../../functions/exportData';
import { NotificationType } from '../../types/Notification';

export default function List() {
    const [hide, setHide] = useState(false);
    const { teachers } = useTypedSelector((state: RootState) => state.teachers);
    const [data, setData] = useState<Teacher[]>(teachers);
    const { startLoading, finishLoading, addNotification } = useActions();

    useEffect(() => {
        setData(teachers);
    }, [teachers])

    if (hide) {
        return (
            <div className={[styles.list, styles.list_hide].join(" ")}>
                <button
                    onClick={() => setHide(false)}
                    className={styles.list__show}
                >
                    <CgArrowRight />
                </button>
            </div>
        )
    }

    async function exportAll() {
        startLoading();
        var props: TeacherProps[] = [];
        var stop: boolean = false;
        for (let i = 0; i < teachers.length; i++) {
            const prop = await generateProps(teachers[i].id, i, teachers.length);
            if (prop === undefined) {
                stop = true;
                break;
            }
            if (!prop.lessons.length) addNotification(NotificationType.warning, `${teachers[i].fullName} не будет в таблице т.к. нету курсов`);
            props.push(prop);
        }
        if (!stop) {
            addNotification(NotificationType.success, `Успешный экспорт ${teachers.length} данных`);
            if (props.length) exportData(`Data_${props[0].year}`, teachers, props);
            finishLoading();
        }
    }

    return (
        <div className={styles.list}>
            <button
                onClick={() => setHide(true)}
                className={styles.list__show}
            >
                Скрыть
            </button>
            <Search placeholder="Поиск..." data={teachers} getResult={(result: Teacher[]) => setData(result)} />
            {data.length ? (
                <>
                    <div className={styles.list__items}>
                        {data.map((teacher: Teacher, i: number) => {
                            return <ListItem teacher={teacher} key={i} />
                        })}
                    </div>
                    <p className={styles.list__count}>Кол-во: {data.length}</p>
                    <button className={styles.list__export} onClick={() => exportAll()}>Export all</button>
                </>
            ) : (
                <div className={styles.list__notfound}>Ничего не найдено</div>
            )}
        </div>
    )
}