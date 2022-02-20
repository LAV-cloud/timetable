import { useEffect } from 'react';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers';
import styles from './ProgressBar.module.scss';

export default function ProgressBar() {
    const { loading } = useTypedSelector((state: RootState) => state.teacher);
    const { progress, text } = loading;

    useEffect(() => {
        drawProgress();
    }, [progress])

    function drawProgress() {
        const progressElement = document.querySelector(`.${styles.progressbar__front}`) as HTMLElement;
        progressElement.style.width = `${progress}%`
    }

    return (
        <div className={styles.progressbar__wrapper}>
            <div className={styles.progressbar}>
                <div className={styles.progressbar__bg}>
                    <div className={styles.progressbar__front}></div>
                </div>
                <p className={styles.progressbar__progress}>{progress}%</p>
            </div>
            {text && (
                <p className={styles.progressbar__text}>{text}</p>
            )}
        </div>
    )
}