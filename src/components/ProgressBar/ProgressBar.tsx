import { useEffect } from 'react';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers';
import styles from './ProgressBar.module.scss';
import { useActions } from '../../redux/hooks/useActions';

export default function ProgressBar() {
    const { loading, progress, text, error } = useTypedSelector((state: RootState) => state.loader);
    const { stopLoading } = useActions();

    useEffect(() => {
        drawProgress();
    }, [progress])

    function drawProgress() {
        const progressElement = document.querySelector(`.${styles.progressbar__front}`) as HTMLElement;
        if (progressElement) progressElement.style.width = `${progress}%`
    }

    if (loading) {
        return (
            <div className={error ?
                [styles.progressbar__wrapper, styles.progressbar__wrapper_error].join(" ")
                : styles.progressbar__wrapper}>
                <div className={styles.progressbar}>
                    <div className={styles.progressbar__bg}>
                        <div className={styles.progressbar__front}></div>
                    </div>
                    <p className={styles.progressbar__progress}>{progress}%</p>
                </div>
                {text && (
                    <p className={styles.progressbar__text}>{text}</p>
                )}
                {error && (
                    <button
                        onClick={() => stopLoading()}
                        className={styles.progressbar__stop}
                    >OK</button>
                )}
            </div>
        )
    }
    return <></>
}