import { useState, useEffect } from 'react';
import styles from './ExportAll.module.scss';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import { useActions } from '../../redux/hooks/useActions';
import { ExportMode } from '../../types/Export';

interface ModeType {
    id: number,
    name: string,
    select: boolean,
    disabled: boolean,
}

export default function ExportAllModes() {
    const [modes, setModes] = useState<ModeType[]>([
        { id: 1, name: "По умолчанию", select: true, disabled: false },
        { id: 2, name: "Ограничить количество", select: false, disabled: false },
        { id: 3, name: "Выбрать из списка", select: false, disabled: true },
    ])
    const { mode } = useTypedSelector((state: RootState) => state.exportSetting);
    const { setExportMode } = useActions();

    function selectMode(id: number) {
        setModes(modes.map((mode: ModeType) => {
            mode.select = false;
            if (mode.id === id && !mode.disabled) {
                mode.select = true;
                setExportMode(mode.id)
            }
            return mode;
        }))
    }

    return (
        <div className={styles.modes}>
            {modes.map((mode: ModeType, i: number) => {
                return <ExportAllMode key={i} selectMode={selectMode} mode={mode} />
            })}
            {mode === ExportMode.count && <ExportAllCount />}
        </div>
    )
}

interface ExportModePropsType {
    mode: ModeType
    selectMode(id: number): void
}

function ExportAllMode(props: ExportModePropsType) {
    const classes: string[] = [styles.mode];

    if (props.mode.select) classes.push(styles.mode_select);
    if (props.mode.disabled) classes.push(styles.mode_disabled);

    return (
        <button
            onClick={() => props.selectMode(props.mode.id)}
            disabled={props.mode.disabled}
            className={classes.join(" ")}
        >
            {props.mode.name}
        </button>
    )
}

function ExportAllCount() {
    const { teachers } = useTypedSelector((state: RootState) => state.teachers);
    const { count } = useTypedSelector((state: RootState) => state.exportSetting);
    const { setExportCount } = useActions();

    useEffect(() => {
        setExportCount(teachers.length);
    }, [])

    function increaseCount() {
        if (count < teachers.length) {
            setExportCount(count + 1);
        }
    }

    function decreaseCount() {
        if (count > 1) {
            setExportCount(count - 1);
        }
    }

    return (
        <div className={styles.count}>
            <p className={styles.count__title}>Количество</p>
            <div className={styles.count__value}>
                <button onClick={() => decreaseCount()} className={styles.count__btn}>-</button>
                <p>{count}</p>
                <button onClick={() => increaseCount()} className={styles.count__btn}>+</button>
            </div>
        </div>
    )
}