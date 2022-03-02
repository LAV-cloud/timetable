import styles from './List.module.scss'
import Search from '../Search/Search'
import ListItem from './ListItem';
import { useState, useEffect } from 'react';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import { CgArrowRight } from 'react-icons/cg';
import ExportAll from '../ExportAll/ExportAll';
import { Group, GroupProps } from '../../types/Group';
import { Teacher, TeacherProps } from '../../types/Teacher';
import { DataType } from '../../types/Data';
import { useActions } from '../../redux/hooks/useActions';

export default function List() {
    var [hide, setHide] = useState(false);
    var [open, setOpen] = useState(false);
    var { data } = useTypedSelector((state: RootState) => state.data);
    var [nowData, setNowData] = useState<Teacher[] | Group[]>(data);

    useEffect(() => {
        setNowData(data);
    }, [data])

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
        <>
            {!hide && <div className={styles.invisibleComponent}></div>}
            <button onClick={() => setOpen(true)} className={styles.menu}>
                <span />
                <span />
                <span />
            </button>
            <div className={open ? [styles.list_open, styles.list].join(" ") : styles.list}>
                <button
                    onClick={() => {
                        if (open) setOpen(false);
                        if (!open) setHide(true)
                    }}
                    className={styles.list__show}
                >
                    Скрыть
                </button>
                <DataMode />
                <Search placeholder="Поиск..." data={data} getResult={(result: Teacher[]) => setNowData(result)} />
                {nowData.length ? (
                    <>
                        <ListItems nowData={nowData} />
                        <p className={styles.list__count}>Кол-во: {nowData.length}</p>
                        <ExportAll data={data} />
                    </>
                ) : (
                    <div className={styles.list__notfound}>Ничего не найдено</div>
                )}
            </div>
        </>
    )
}

function DataMode() {
    const { dataType } = useTypedSelector((state: RootState) => state.data);
    const { setDataType } = useActions();

    return (
        <div className={styles.list__modes}>
            <button onClick={() => setDataType(DataType.teachers)} className={dataType === DataType.teachers ? [styles.list__mode, styles.list__mode_select].join(" ") : styles.list__mode}>{DataType.teachers}</button>
            <button onClick={() => setDataType(DataType.groups)} className={dataType === DataType.groups ? [styles.list__mode, styles.list__mode_select].join(" ") : styles.list__mode}>{DataType.groups}</button>
        </div>
    )
}

function ListItems({ nowData }: { nowData: Teacher[] | Group[] }) {
    var { dataType } = useTypedSelector((state: RootState) => state.data);
    var { props } = useTypedSelector((state: RootState) => state.item);

    switch (dataType) {
        case DataType.groups:
            nowData = nowData as Group[];
            return (
                <div className={styles.list__items}>
                    {nowData.map((item: Group, i: number) => {
                        props = props as GroupProps;
                        return <ListItem
                            key={i}
                            item={item}
                            text={item.print}
                            selectId={props?.group.id}
                        />
                    })}
                </div>
            );
        case DataType.teachers:
            nowData = nowData as Teacher[];
            return (
                <div className={styles.list__items}>
                    {nowData.map((item: Teacher, i: number) => {
                        props = props as TeacherProps;
                        return <ListItem
                            text={item.fullName}
                            item={item}
                            key={i}
                            selectId={props?.teacher.id}
                        />
                    })}
                </div>
            );
    }
}