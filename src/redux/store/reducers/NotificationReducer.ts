import {
  NotificationState,
  NotificationAction,
  NotificationActionType,
} from '../../../types/Notification';

const initialState: NotificationState = {
  notifications: [],
  maxCount: 3,
};

export const notificationReducer = (
  state: NotificationState = initialState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case NotificationActionType.addNotification:
      return { ...state, notifications: action.payload };
    case NotificationActionType.removeNotification:
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};
