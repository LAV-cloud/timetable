import { combineReducers } from 'redux';
import { notificationReducer } from './NotificationReducer';
import { dataReducer } from './DataReducer';
import { itemReducer } from './ItemReducer';
import { loaderReducer } from './Loader';
import { exportReducer } from './ExportReducer';
import { configReducer } from './ConfigReducer';

export const rootReducer = combineReducers({
  loader: loaderReducer,
  config: configReducer,
  item: itemReducer,
  data: dataReducer,
  notification: notificationReducer,
  exportSetting: exportReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
