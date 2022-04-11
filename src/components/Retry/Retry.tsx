import styles from './Retry.module.scss';

interface RetryProps {
    error: string,
    perform(): void
}

export default function Retry(props: RetryProps) {
    return (
        <div className={styles.retry}>
            <p className={styles.retry__text}>{props.error}</p>
            <button className={styles.retry__btn} onClick={() => props.perform()} aria-label='retry'>Повторить попытку</button>
        </div>
    )
}