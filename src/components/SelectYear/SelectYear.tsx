import styles from './SelectYear.module.scss';

interface SelectYearPropsType {
    year: number,
    nextYear(): void,
    prevYear(): void
}

export default function SelectYear(props: SelectYearPropsType) {
    return (
        <div className={styles.year}>
            <button aria-label="prev year" onClick={() => props.prevYear()} className={styles.year__btn}>{"<"}</button>
            <p>{props.year} - {props.year + 1}</p>
            <button aria-label="next year" onClick={() => props.nextYear()} className={styles.year__btn}>{">"}</button>
        </div>
    )
}