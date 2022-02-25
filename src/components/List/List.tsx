import styles from './List.module.scss'
import Search from '../Search/Search'
import ListItem from './ListItem';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import { Teacher } from '../../types/Teacher';
import { CgArrowRight } from 'react-icons/cg';
import ExportAll from '../ExportAll/ExportAll';

export default function List() {
    const [hide, setHide] = useState(false);
    const { teachers } = useTypedSelector((state: RootState) => state.teachers);
    const [data, setData] = useState<Teacher[]>(teachers);

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
                    <ExportAll data={teachers} />
                </>
            ) : (
                <div className={styles.list__notfound}>Ничего не найдено</div>
            )}
        </div>
    )
}