import styles from './ExportAll.module.scss';
import { useActions } from '../../redux/hooks/useActions';
import { BsGear } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import ExportAllSetting from './ExportAllSetting';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import { ExportMode } from '../../types/Export';
import { Group } from '../../types/Group';
import { Teacher } from '../../types/Teacher';
import { exportAllData } from '../../functions/exportAll';

interface ExportPropsType {
    data: Teacher[] | Group[],
}

export default function ExportAll({ data }: ExportPropsType) {
    const { setExportSelectData, setExportCount } = useActions();
    const [open, setOpen] = useState<boolean>(false);
    const { selectData, mode } = useTypedSelector((state: RootState) => state.exportSetting);
    var { dataType, typeSetting } = useTypedSelector((state: RootState) => state.config);

    useEffect(() => {
        if (mode !== ExportMode.select) setExportSelectData(data);
        if (mode !== ExportMode.count) setExportCount(selectData.length);
        if (mode === ExportMode.default) setExportCount(data.length);
    }, [])

    function toggle() {
        const nowState = open;
        setOpen(!nowState);
    }

    if (typeSetting[dataType].exportAll) {
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
                        onClick={() => exportAllData(selectData)
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
    return <></>
}