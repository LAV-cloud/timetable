import styles from './Notification.module.scss';
import { useTypedSelector } from '../../redux/hooks/useTypedSelector';
import { RootState } from '../../redux/store/reducers/index';
import Notification from './Notification';
import { Notification as NotificationType } from '../../types/Notification';

export default function NotificationList() {
    const { notifications } = useTypedSelector((state: RootState) => state.notification);

    return (
        <div className={styles.list}>
            {notifications.map((notification: NotificationType, i: number) => {
                return <Notification key={i} notification={notification} />
            })}
        </div>
    )
}