import { combineReducers } from 'redux';
import { notificationReducer } from './NotificationReducer';
import { teachersReducer } from './TeachersReducer';
import { teacherReducer } from './TeacherReducer';
import { loaderReducer } from './Loader';

export const rootReducer = combineReducers({
  teacher: teacherReducer,
  teachers: teachersReducer,
  notification: notificationReducer,
  loader: loaderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
