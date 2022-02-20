import { combineReducers } from 'redux';
import { notificationReducer } from './NotificationReducer';
import { teachersReducer } from './TeachersReducer';
import { teacherReducer } from './TeacherReducer';

export const rootReducer = combineReducers({
  teacher: teacherReducer,
  teachers: teachersReducer,
  notification: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
