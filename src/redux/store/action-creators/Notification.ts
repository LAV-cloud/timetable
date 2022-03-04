import {
  NotificationActionType,
  NotificationType,
  NotificationAction,
  Notification,
} from '../../../types/Notification';
import { Dispatch } from 'redux';
import { store } from '..';
import { FaRegTimesCircle } from 'react-icons/fa';
import { BiErrorAlt, BiCheckCircle } from 'react-icons/bi';

export function addError(text: string) {
  return (dispatch: Dispatch<NotificationAction>) => {
    var notifications = addNotification(NotificationType.error, text);
    dispatch({
      type: NotificationActionType.addNotification,
      payload: notifications,
    });
  };
}

export function addWarning(text: string) {
  return (dispatch: Dispatch<NotificationAction>) => {
    var notifications = addNotification(NotificationType.warning, text);
    dispatch({
      type: NotificationActionType.addNotification,
      payload: notifications,
    });
  };
}

export function addSuccess(text: string) {
  return (dispatch: Dispatch<NotificationAction>) => {
    var notifications = addNotification(NotificationType.success, text);
    dispatch({
      type: NotificationActionType.addNotification,
      payload: notifications,
    });
  };
}

function addNotification(type: NotificationType, text: string) {
  const { notifications, maxCount } = store.getState().notification;
  const icon = () => {
    if (type === NotificationType.error) {
      return FaRegTimesCircle;
    } else if (type === NotificationType.success) {
      return BiCheckCircle;
    } else {
      return BiErrorAlt;
    }
  };
  const newNotification = {
    id: Math.floor(Math.random() * 1000000),
    icon: icon,
    type,
    text,
  };
  if (notifications.length + 1 > maxCount) notifications.shift();
  notifications.push(newNotification);
  return notifications;
}

export function removeNotification(id: number) {
  return (dispatch: Dispatch<NotificationAction>) => {
    var { notifications } = store.getState().notification;
    notifications = notifications.filter((not: Notification) => not.id !== id);
    dispatch({
      type: NotificationActionType.addNotification,
      payload: notifications,
    });
  };
}
