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
  error = 'Ошибка',
  warning = 'Предупреждение',
  success = 'Успешно',
}

export interface Notification {
  id: number;
  icon: Function;
  type: NotificationType;
  text: string;
}
