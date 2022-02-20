import { exportData } from "../../functions/exportData";
import { useTypedSelector } from "../../redux/hooks/useTypedSelector";
import { RootState } from "../../redux/store/reducers";
import styles from './Export.module.scss';

export default function Export() {
    const { props, teacher, loading } = useTypedSelector((state: RootState) => state.teacher);
    const filename = `${teacher!.secondName} ${teacher!.firstName[0]}.${teacher!.thirdName[0]}.`

    function exportToExcel() {
        exportData(filename + props?.year, props!.lessons);
    }

    if (!loading.toggle) {
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