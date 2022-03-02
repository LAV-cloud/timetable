import { combineReducers } from 'redux';
import { notificationReducer } from './NotificationReducer';
import { dataReducer } from './DataReducer';
import { itemReducer } from './ItemReducer';
import { loaderReducer } from './Loader';
import { exportReducer } from './ExportReducer';

export const rootReducer = combineReducers({
  item: itemReducer,
  data: dataReducer,
  notification: notificationReducer,
  loader: loaderReducer,
  exportSetting: exportReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
