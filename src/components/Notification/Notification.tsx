import styles from './Notification.module.scss';
import { Notification as NotificationT } from '../../types/Notification';
import { useActions } from '../../redux/hooks/useActions';

interface NotificationProps {
    notification: NotificationT
}

export default function Notification(props: NotificationProps) {
    const { removeNotification } = useActions();

    return (
        <div className={styles.notification} onClick={() => removeNotification(props.notification.id)}>
            <div className={styles.notification__title}>
                {props.notification.icon()()}
                <p>{props.notification.type}</p>
            </div>
            <p className={styles.notification__title}>{props.notification.text}</p>
        </div>
    )
}