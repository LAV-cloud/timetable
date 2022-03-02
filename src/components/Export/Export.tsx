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