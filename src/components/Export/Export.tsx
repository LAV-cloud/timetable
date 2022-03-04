import { useTypedSelector } from "../../redux/hooks/useTypedSelector";
import { RootState } from "../../redux/store/reducers";
import styles from './Export.module.scss';
import { TeacherProps } from '../../types/Teacher';
import { GroupProps } from '../../types/Group';

interface ExportPropsType {
    filename: string,
    data: TeacherProps | GroupProps,
    exportFile(filename: string, data: TeacherProps | GroupProps): void,
}

export default function Export({ filename, exportFile, data }: ExportPropsType) {
    const state = useTypedSelector((state: RootState) => state.item);
    const { dataType, typeSetting } = useTypedSelector((state: RootState) => state.config);
    const { loading } = state;

    if (!loading) {
        return (
            <div className={styles.export}>
                <button
                    onClick={() => exportFile(filename, data)}
                    className={typeSetting[dataType].export ? styles.export__btn : [styles.export__btn, styles.export__btn_disabled].join(" ")}
                    disabled={!typeSetting[dataType].export}
                >
                    Экспорт
                </button>
            </div >
        )
    }
    return <></>
} 