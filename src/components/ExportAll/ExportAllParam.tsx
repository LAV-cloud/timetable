import styles from './ExportAll.module.scss';

interface ExportParamPropsType {
    children: any
    title: string,
}

export default function ExportAllParam(props: ExportParamPropsType) {
    return (
        <div className={styles.param}>
            <p className={styles.param__title}>{props.title}</p>
            {props.children}
        </div>
    )
}