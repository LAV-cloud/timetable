import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput';
import SelectYear from '../SelectYear/SelectYear';
import styles from './ExportAll.module.scss';
import ExportAllModes from './ExportAllModes';
import ExportAllParam from './ExportAllParam';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import { useActions } from '../../redux/hooks/useActions';

export default function ExportAllSetting() {
    const date = new Date();
    const { year, filename } = useTypedSelector((state: RootState) => state.exportSetting);
    const filenameInput = useInput(filename);
    const { setExportYear, setExportFilename } = useActions();

    useEffect(() => {
        if (filenameInput.value() !== "") setExportFilename(filenameInput.value());
        if (filenameInput.value() === "") setExportFilename("Data");
    }, [filenameInput.value()])

    function nextYear() {
        if (
            (year === date.getFullYear() && date.getMonth() >= 8) ||
            (year < date.getFullYear() && year + 1 !== date.getFullYear())) {
            setExportYear(year + 1);
        }
    }

    function prevYear() {
        if (year > 2021) setExportYear(year - 1);
    }

    return (
        <div className={styles.setting}>
            <p className={styles.setting__title}>Настройки экспорта</p>
            <div className={styles.list}>
                <ExportAllParam title="Выберите режим" >
                    <ExportAllModes />
                </ExportAllParam>
                <ExportAllParam title="Название файла" >
                    <input className={styles.list__input} {...filenameInput.bind} />
                </ExportAllParam>
                <ExportAllParam title="Учебный год" >
                    <SelectYear year={year} nextYear={nextYear} prevYear={prevYear} />
                </ExportAllParam>
            </div>
        </div>
    )
}