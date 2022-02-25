import { combineReducers } from 'redux';
import { notificationReducer } from './NotificationReducer';
import { teachersReducer } from './TeachersReducer';
import { teacherReducer } from './TeacherReducer';
import { loaderReducer } from './Loader';
import { exportReducer } from './ExportReducer';

export const rootReducer = combineReducers({
  teacher: teacherReducer,
  teachers: teachersReducer,
  notification: notificationReducer,
  loader: loaderReducer,
  exportSetting: exportReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
