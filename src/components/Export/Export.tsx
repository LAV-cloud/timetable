import { useTypedSelector } from "../../redux/hooks/useTypedSelector";
import { RootState } from "../../redux/store/reducers";
import { TeacherState } from "../../types/Teacher";
import styles from './Export.module.scss';

interface ExportPropsType {
    filename: string,
    data: TeacherState,
    exportFile: Function,
}

export default function Export({ filename, exportFile, data }: ExportPropsType) {
    const state = useTypedSelector((state: RootState) => state.teacher);
    const { loading } = state;

    if (!loading) {
        return (
            <div className={styles.export}>
                <button
                    onClick={() => exportFile(filename, data)}
                    className={styles.export__btn}
                >
                    Экспорт
                </button>
            </div >
        )
    }
    return <></>
} 