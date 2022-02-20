export interface NotificationState {
  notifications: Notification[];
  maxCount: number;
}

export enum NotificationActionType {
  addNotification = 'ADD_NOTIFICATION',
  removeNotification = 'REMOVE_NOTIFICATION',
}

interface AddNotification {
  type: NotificationActionType.addNotification;
  payload: Notification[];
}

interface RemoveNotification {
  type: NotificationActionType.removeNotification;
  payload: Notification[];
}

export type NotificationAction = AddNotification | RemoveNotification;

export enum NotificationType {
  error = 'ERROR',
  warning = 'WARNING',
  success = 'SUCCESS',
}

export interface Notification {
  id: number;
  icon: Function;
  type: NotificationType;
  text: string;
}
