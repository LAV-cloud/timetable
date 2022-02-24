import { exportFile } from "../../functions/exportData";
import { useTypedSelector } from "../../redux/hooks/useTypedSelector";
import { RootState } from "../../redux/store/reducers";
import styles from './Export.module.scss';

export default function Export() {
    const state = useTypedSelector((state: RootState) => state.teacher);
    const { props, teacher, loading } = state;
    const filename = `${teacher!.secondName} ${teacher!.firstName[0]}.${teacher!.thirdName[0]}.`

    function exportToExcel() {
        exportFile(filename + `${props?.year}-${props!.year + 1}`, state);
    }

    if (!loading) {
        return (
            <div className={styles.export}>
                <button
                    onClick={() => exportToExcel()}
                    className={styles.export__btn}
                >
                    Экспорт
                </button>
            </div>
        )
    }
    return <></>
} 