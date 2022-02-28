import styles from './ExportAll.module.scss';
import { useActions } from '../../redux/hooks/useActions';
import { exportTeachersData } from '../../functions/exportTeacher';
import { NotificationType } from '../../types/Notification';
import { generateProps } from '../../functions/generateProps';
import { Teacher, TeacherProps } from '../../types/Teacher';
import { BsGear } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import ExportAllSetting from './ExportAllSetting';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import { ExportMode } from '../../types/Export';

interface ExportPropsType {
    data: Teacher[],
}

export default function ExportAll({ data }: ExportPropsType) {
    const { startLoading, finishLoading, addNotification, setExportSelectData, setExportCount } = useActions();
    const [open, setOpen] = useState<boolean>(false);
    const { count, year, selectData, filename, mode } = useTypedSelector((state: RootState) => state.exportSetting);

    useEffect(() => {
        if (mode !== ExportMode.select) setExportSelectData(data);
        if (mode !== ExportMode.count) setExportCount(selectData.length);
        if (mode === ExportMode.default) setExportCount(data.length);
    }, [])

    function toggle() {
        const nowState = open;
        setOpen(!nowState);
    }

    async function exportData() {
        startLoading();
        var props: { teacher: string, props: TeacherProps }[] = [];
        await Promise.all(selectData.map(async (item: Teacher, i: number) => {
            if (i < count) {
                const prop = await generateProps(item.id, year);
                if (prop === undefined) return;
                props.push({ teacher: item.fullName, props: prop });
            }
        }));
        if (props.length) addNotification(NotificationType.success, `Успешный экспорт ${count} данных`);
        if (props.length) await exportTeachersData(filename, props);
        finishLoading();
    }

    return (
        <>
            {open && <ExportAllSetting />}
            <div className={styles.export}>
                <button
                    disabled={!data.length}
                    className={
                        data.length ?
                            styles.export__btn :
                            [styles.export__btn, styles.export__btn_disabled].join(" ")
                    }
                    onClick={() => exportData()
                    }>
                    Экспортировать всё
                </button>
                {data.length > 0 && (
                    <button
                        className={open ?
                            [styles.export__setting, styles.export__setting_open].join(" ") :
                            styles.export__setting
                        }
                        onClick={() => toggle()}
                    >
                        <BsGear />
                    </button>
                )}
            </div>
        </>
    )
}